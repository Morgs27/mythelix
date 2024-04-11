import { NextResponse, NextRequest } from "next/server";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest, params: {params: {username: string}}){
    try{

        // const session = await getServerSession({req, res, options});

        const { username } = params.params;

        // if (!session) {
        //     return new Response(JSON.stringify({'message': 'Unauthorized'}), {status: 409});
        // }

        const user = await User.findOne({username: username});

        if (!user) {
            return new Response(JSON.stringify({'message': 'User Not Found'}), { status: 409 } );
        }

        const returnUser = {
            username: String,
            rank: String,
            level: String,
            buildTokens: String,
            crystals: String,
        }

        returnUser.username = user.username;
        returnUser.rank = user.rank;
        returnUser.level = user.level;
        returnUser.buildTokens = user.buildTokens;
        returnUser.crystals = user.crystals;

        return new Response(JSON.stringify({'message': 'Success', returnUser}), { status: 200 } );
       
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Server Error", err}, {status: 500})
    }
}
