import { NextRequest } from "next/server";
import Card from "@/app/_mongoDB/models/Card";
import { connectDB } from "@/app/_mongoDB/connect";

export async function GET(
  request: NextRequest,
  params: { params: { username: string } }
) {
  await connectDB();

  const { username } = params.params;

  let cards = await Card.find({ username: username });

  cards = cards.map((card) => {
    let new_card = card;
    new_card.imageSrc = card.imageSrc.replace(
      "storage.cloud.google.com",
      "storage.googleapis.com"
    );
    return new_card;
  });

  let reversedData = cards.reverse();

  if (reversedData.length === 0) {
    return new Response(JSON.stringify({ data: [null] }), { status: 200 });
  }

  return new Response(JSON.stringify({ data: reversedData }), { status: 200 });
}
