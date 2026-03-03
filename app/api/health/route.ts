import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  let dbStatus = "NOT TESTED";
  try {
    await connectDB();
    dbStatus = "CONNECTED ✓";
  } catch (e) {
    dbStatus = `FAILED: ${(e as Error).message}`;
  }

  return NextResponse.json({
    MONGODB_URI: process.env.MONGODB_URI ? "SET ✓" : "MISSING ✗",
    JWT_SECRET: process.env.JWT_SECRET ? "SET ✓" : "MISSING ✗",
    DB_CONNECTION: dbStatus,
  });
}
