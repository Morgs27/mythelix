import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/_mongoDB/connect";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const guestUsername = `guest_${Date.now()}`;
    const guestPassword = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(guestPassword, 10);

    const guestUser = await User.create({
      username: guestUsername,
      email: `${guestUsername}@guest.mythelix.com`,
      password: hashPassword,
      rank: 0,
      level: 0,
      buildTokens: 100,
      crystals: 10000,
      friends: JSON.stringify([]),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires after 1 day
    });

    return NextResponse.json(
      {
        message: "Guest account created successfully",
        username: guestUsername,
        password: guestPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating guest account:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
