import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';
import { NextResponse, NextRequest } from 'next/server'
import Card from '@/app/_mongoDB/models/Card';
import { connectDB } from '@/app/_mongoDB/connect';

export async function GET(request: NextRequest, params : {username: string}) { 

    await connectDB();

    const { username } = params;

    // Get all cards for Username
    let cards = await Card.find({username: username});

    return new Response(JSON.stringify({data: cards}), { status: 200 } );
}
