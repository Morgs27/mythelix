import { NextResponse, NextRequest } from "next/server";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){
    try{
        const body = await req.json()
        const userData = body.formData;

        // Confirm data exists
        if (!userData.email || !userData.password || !userData.name) {
            return NextResponse.json({message: "Please fill out all fields"}, {status: 400})
        }

        // check for duplicate emails
        const duplicate = await User.findOne({email: userData.email}).lean().exec()

        if (duplicate){
            return NextResponse.json({message: "Email already in use"}, {status: 409})
        }

        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await User.create(userData);

        return NextResponse.json({message: "User created successfully"}, {status: 201})

    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Error", err}, {status: 500})
    }
}
