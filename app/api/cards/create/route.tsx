import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/app/_mongoDB/connect';
import UnclaimedImage from '@/app/_mongoDB/models/UnclaimedImage';
import Card from '@/app/_mongoDB/models/Card';
import mainData from '@/app/_data/mainData.json';

export async function POST(req: NextRequest) {

    // Check if the request method is POST
    if (req.method !== 'POST') {
        // If not, return a 405 Method Not Allowed error
        return new Response(JSON.stringify({'message': 'Method Not Allowed'}), { status: 405 });
    }

    try {

        await connectDB();

        // Get data from request body
        const data = await req.json();

        const {username, imageSrc, type, alteration, cost, defence, attack, contribution, effect} = data;

        // Check if the request body contains all required fields
        if (!username || !imageSrc || !type || !alteration || !cost || !defence || !attack || !contribution || !effect) {
            return new Response(JSON.stringify({'message': 'Missing Fields'}), { status: 409 });
        }

        console.log('here')

        // Create Card
        const card = await Card.create({
            username, imageSrc, type, alteration, cost, defence, attack, contribution, effect, onSale: false
        });

        // Rest of your code...
        return new Response(JSON.stringify({'message': 'Sucess'}), { status: 200 });
    } catch (error) {
        // Return an error response
        return new Response(JSON.stringify({'message': 'Server Error'}), { status: 409 } );
    }
}
