import mongoose from "mongoose";

// MONGODB_URI is read inside connectDB() so it's only evaluated at request time,
// not during Next.js build/static analysis (which would throw if env var is absent).
const MONGODB_URI = process.env.MONGODB_URI;

// ─── Connection pool options ───────────────────────────────────────────────────
// Serverless functions spin up many short-lived Node processes.  A generous
// maxPoolSize would waste Atlas free-tier connections; a pool of 5–10 is the
// right trade-off.  minPoolSize keeps at least one socket warm so the first
// query after a cold-start doesn't pay full TCP handshake cost.
const MONGOOSE_OPTS: mongoose.ConnectOptions = {
  bufferCommands: false,    // fail fast instead of queuing ops while disconnected
  maxPoolSize: 10,          // max open sockets per serverless instance
  minPoolSize: 1,           // keep one socket warm after first connect
  serverSelectionTimeoutMS: 5_000,   // give up selecting a server after 5 s
  socketTimeoutMS: 45_000,           // close idle sockets after 45 s
  connectTimeoutMS: 10_000,          // TCP connect timeout
  heartbeatFrequencyMS: 10_000,      // how often to ping MongoDB for health
  family: 4,                // force IPv4 — avoids DNS lookup delays on some hosts
};

// ─── Global cache type ────────────────────────────────────────────────────────
// Next.js hot-reload creates new module instances but preserves `global`.
// Storing the cache on `global` means the second call within the same
// Node process (same serverless container) skips the TCP handshake entirely.
interface ConnectionCache {
  conn:    typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var __mongoose_cache__: ConnectionCache | undefined;  
}

// Initialise once; subsequent module evaluations reuse the same object.
const cache: ConnectionCache =
  global.__mongoose_cache__ ?? (global.__mongoose_cache__ = { conn: null, promise: null });

// ─── Connection state helpers ─────────────────────────────────────────────────
// Mongoose exposes readyState as a number; map it to a readable string for logs.
const STATE: Record<number, string> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export function connectionState(): string {
  return STATE[mongoose.connection.readyState] ?? "unknown";
}

/** Returns true when an open connection already exists. */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * connectDB()
 *
 * Call at the top of every API route handler and Server Action.
 * Subsequent calls within the same serverless container are instant (cache hit).
 *
 * Usage:
 *   import { connectDB } from "@/lib/db";
 *
 *   export async function GET() {
 *     await connectDB();
 *     const users = await User.find();
 *     ...
 *   }
 */
export async function connectDB(): Promise<typeof mongoose> {
  // ── Validate env at request time (not build time) ───────────────────────────
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local (dev) or Vercel env vars (prod)."
    );
  }

  // ── Fast path: already connected in this container ──────────────────────────
  if (cache.conn && isConnected()) {
    return cache.conn;
  }

  // ── Slow path: a connect is already in-flight (concurrent requests) ─────────
  // Two Lambda invocations that both hit a cold container simultaneously would
  // both reach this point.  We only create ONE promise and both await it.
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI as string, MONGOOSE_OPTS)
      .then((instance) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("[db] MongoDB connected ✓");
        }
        return instance;
      });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    // Clear the promise so the next request triggers a fresh attempt.
    // Without this, every subsequent request fails immediately without
    // retrying — a permanently broken container.
    cache.promise = null;
    cache.conn    = null;

    console.error("[db] MongoDB connection failed:", (err as Error).message);
    throw err;
  }

  return cache.conn;
}

// ─── Graceful shutdown (optional, useful in tests) ───────────────────────────
/**
 * Call disconnectDB() in Jest globalTeardown or long-running scripts.
 * Not needed in normal serverless operation — the container is discarded.
 */
export async function disconnectDB(): Promise<void> {
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn    = null;
    cache.promise = null;
  }
}
