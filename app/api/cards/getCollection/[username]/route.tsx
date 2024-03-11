import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';
import { NextResponse, NextRequest } from 'next/server'
import Card from '@/app/_mongoDB/models/Card';
import { connectDB } from '@/app/_mongoDB/connect';

export async function GET(request: NextRequest, params: {params: {username: string}}) { 

    await connectDB();

    console.log('get collection')

    const { username } = params.params;

    // Get all cards for Username
    let cards = await Card.find({username: username});

    // Change image access point
    cards = cards.map((card) => {
        let new_card = card;
        new_card.imageSrc = card.imageSrc.replace("storage.cloud.google.com", "storage.googleapis.com");
        return new_card;
    })

    let reversedData = cards.reverse();

    if (reversedData.length === 0) {
        return new Response(JSON.stringify({data: [null]}), { status: 200 } );
    }

    return new Response(JSON.stringify({data: reversedData}), { status: 200 } );
}
