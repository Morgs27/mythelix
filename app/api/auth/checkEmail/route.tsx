import { NextResponse, NextRequest } from 'next/server'
import { connectDB } from '@/app/_mongoDB/connect';
import User from '@/app/_mongoDB/models/User';

export async function GET(request: NextRequest) { 

    await connectDB();

    const email = request.nextUrl.searchParams.get('email')

    console.log('Checking email', email)

    const duplicateUsername = await User.findOne({email: email}).lean().exec()
    if (duplicateUsername){
        return NextResponse.json({message: "Email already in use"}, {status: 409})
    }

    return new Response(JSON.stringify({
        message: 'Email is available'
    }), { status: 200 } );

}