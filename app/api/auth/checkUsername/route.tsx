import { NextResponse, NextRequest } from 'next/server'
import { connectDB } from '@/app/_mongoDB/connect';
import User from '@/app/_mongoDB/models/User';

export async function GET(request: NextRequest) { 


    await connectDB();

    const name = request.nextUrl.searchParams.get('name')

    const duplicateUsername = await User.findOne({username: name}).lean().exec()
    if (duplicateUsername){
        return NextResponse.json({message: "Username already in use"}, {status: 409})
    }

    return new Response(JSON.stringify({
        message: 'Username is available'
    }), { status: 200 } );

}