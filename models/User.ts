import mongoose, { Document, Model, Schema, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;        // stored as bcrypt hash; never returned by default
  avatar: string;
  createdAt: Date;
  updatedAt: Date;

  /** Returns true when the plain-text candidate matches the stored hash. */
  comparePassword(candidate: string): Promise<boolean>;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,   // creates a unique index in MongoDB
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      /**
       * `select: false` — password is excluded from every query result
       * unless the caller explicitly opts in with .select("+password").
       * This is the single most important password-safety setting.
       */
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically

    /**
     * toJSON transform — strips the password field from any object that is
     * serialised to JSON (e.g. res.json(user)).  Belt-and-suspenders on top
     * of `select: false`.
     */
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret["password"];
        delete ret["__v"];
        return ret;
      },
    },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// email already has a unique index from `unique: true` above.
// Add a case-insensitive text index for username lookups if needed later.
UserSchema.index({ username: 1 });

// ─── Middleware ───────────────────────────────────────────────────────────────

/**
 * Hash the password before every save — but only when it has been modified.
 * This means updates to other fields (avatar, username, etc.) skip bcrypt.
 */
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Cost factor 12 — ~300 ms on modern hardware, comfortably above 100 ms
    // minimum while staying fast enough for login UX.
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

// ─── Instance methods ─────────────────────────────────────────────────────────

/**
 * Usage in an auth route:
 *
 *   const user = await User.findOne({ email }).select("+password");
 *   const ok   = await user.comparePassword(req.body.password);
 */
UserSchema.methods.comparePassword = function (
  candidate: string
): Promise<boolean> {
  // `this.password` is the bcrypt hash fetched via .select("+password")
  return bcrypt.compare(candidate, this.password);
};

// ─── Model ────────────────────────────────────────────────────────────────────

// Guard against Next.js hot-reload re-compiling the model.
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
