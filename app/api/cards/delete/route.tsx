import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/app/_mongoDB/connect';
import UnclaimedImage from '@/app/_mongoDB/models/UnclaimedImage';
import Card from '@/app/_mongoDB/models/Card';
import mainData from '@/app/_data/mainData.json';
import {getServerSession} from 'next-auth/next';
import {options} from '../../auth/[...nextauth]/options'
import User from '@/app/_mongoDB/models/User';

export async function POST(req: NextRequest, res: NextResponse) {

    // Check if the request method is POST
    if (req.method !== 'POST') {
        // If not, return a 405 Method Not Allowed error
        return new Response(JSON.stringify({'message': 'Method Not Allowed'}), { status: 409 });
    }

    try {

         // @ts-ignore
        const session = await getServerSession({req, res, options});

        console.log(session);

        if (!session) {
            return new Response(JSON.stringify({'message': 'Unauthorized'}), {status: 409});
        }

        // Get user email from session
        const sessionEmail = session.user.email;

        await connectDB();
          
        const sessionUser = await User.findOne({email: sessionEmail});
          
        // Get data from request body
        const data = await req.json();

        const {username, id} = data;

        console.log("Got", username, id)

        const card_details = await Card.findOne({_id: id});

        console.log(card_details, session, username)

        if (card_details){
            if (card_details.username != sessionUser.username || card_details.username != username){
                return new Response(JSON.stringify({'message': 'Username Error'}), { status: 409 } );
            }
        }
        else {
            return new Response(JSON.stringify({'message': 'Card Not Found'}), { status: 409 } );
        }

        // Delete Card
        const result = await Card.deleteOne({ _id: id });

        console.log('deleting')

        // Check if the card was found and deleted
        if (result.deletedCount === 1) {
            console.log('Card deleted successfully.');

            // Update the users crystals
            const cardUser = await User.findOne({username: card_details.username});

            console.log('here')

            let crystalChange = 0;

            console.log(card_details.alteration)

            if (card_details.alteration == 'null'){
                crystalChange = mainData.crystals.deletion_normal;
            }
            else {
                crystalChange = mainData.crystals.deletion_alteration;
            }

            console.log(crystalChange)

            cardUser.crystals = parseInt(cardUser.crystals) + crystalChange;

            await cardUser.save();
            
            return new Response(JSON.stringify({'message': 'Sucess'}), { status: 200 } );
        } else {
            console.log('No card found with the given ID.');
            return new Response(JSON.stringify({'message': 'Card Not Found'}), { status: 409 } );
        }
        
        
    } catch (error) {
        // Return an error response
        return new Response(JSON.stringify({'message': 'Server Error'}), { status: 409 } );
    }
}
