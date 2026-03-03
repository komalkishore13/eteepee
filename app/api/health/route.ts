import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    MONGODB_URI: process.env.MONGODB_URI ? "SET ✓" : "MISSING ✗",
    JWT_SECRET: process.env.JWT_SECRET ? "SET ✓" : "MISSING ✗",
  });
}
