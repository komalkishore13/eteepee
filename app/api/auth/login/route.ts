import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // .select("+password") opts in to the otherwise-hidden field
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
      "+password"
    );

    // Same message for missing user and wrong password — prevents user-enumeration
    const invalid = NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );

    if (!user) return invalid;

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) return invalid;

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Signed in successfully",
        data: {
          userId: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again.", debug: (error as Error).message },
      { status: 500 }
    );
  }
}
