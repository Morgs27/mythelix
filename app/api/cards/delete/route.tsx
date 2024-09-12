import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/_mongoDB/connect";
import Card from "@/app/_mongoDB/models/Card";
import mainData from "@/app/_data/mainData.json";
import { getServerSession } from "next-auth/next";
import { options } from "../../auth/[...nextauth]/options";
import User from "@/app/_mongoDB/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 409,
    });
  }

  try {
    // @ts-ignore
    const session = await getServerSession({ req, res, options });

    console.log(session);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 409,
      });
    }

    // @ts-ignore
    const sessionEmail = session.user.email;

    await connectDB();

    const sessionUser = await User.findOne({ email: sessionEmail });

    const data = await req.json();

    const { username, id } = data;

    console.log("Got", username, id);

    const card_details = await Card.findOne({ _id: id });

    console.log(card_details, session, username);

    if (card_details) {
      if (
        card_details.username != sessionUser.username ||
        card_details.username != username
      ) {
        return new Response(JSON.stringify({ message: "Username Error" }), {
          status: 409,
        });
      }
    } else {
      return new Response(JSON.stringify({ message: "Card Not Found" }), {
        status: 409,
      });
    }

    const result = await Card.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      console.log("Card deleted successfully.");

      const cardUser = await User.findOne({ username: card_details.username });

      console.log("here");

      let crystalChange = 0;

      console.log(card_details.alteration);

      if (card_details.alteration == "null") {
        crystalChange = mainData.crystals.deletion_normal;
      } else {
        crystalChange = mainData.crystals.deletion_alteration;
      }

      console.log(crystalChange);

      cardUser.crystals = parseInt(cardUser.crystals) + crystalChange;

      await cardUser.save();

      return new Response(JSON.stringify({ message: "Sucess" }), {
        status: 200,
      });
    } else {
      console.log("No card found with the given ID.");
      return new Response(JSON.stringify({ message: "Card Not Found" }), {
        status: 409,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 409,
    });
  }
}
