import { NextResponse, NextRequest } from "next/server";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";
import mainData from "@/app/_data/mainData.json";
import { connectDB } from "@/app/_mongoDB/connect";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    // Check all fields are given
    if (!name || !email || !password) {
      // Return an error
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 500 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: email }).lean().exec();
    if (duplicate) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // check for duplicate usernames
    const duplicateUsername = await User.findOne({ username: name })
      .lean()
      .exec();
    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Username already in use" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const friends: any[] = [];

    await User.create({
      username: name,
      email: email,
      password: hashPassword,
      rank: 0,
      level: 0,
      buildTokens: mainData.account_setup.starting_tokens,
      crystals: mainData.account_setup.starting_crystals,
      friends: JSON.stringify(friends),
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        username: name,
        password: password,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
