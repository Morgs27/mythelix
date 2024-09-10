import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/_mongoDB/connect";
import UnclaimedImage from "@/app/_mongoDB/models/UnclaimedImage";
import Card from "@/app/_mongoDB/models/Card";
import mainData from "@/app/_data/mainData.json";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, numberOfCards } = await req.json();

    if (
      !username ||
      !numberOfCards ||
      numberOfCards < 1 ||
      numberOfCards > 10
    ) {
      return new NextResponse(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }

    const createdCards = [];

    for (let i = 0; i < numberOfCards; i++) {
      const cardData = await generateRandomCard(username);
      const card = await Card.create(cardData);
      createdCards.push(card);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Cards created successfully",
        cards: createdCards,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating random cards:", error);
    return new NextResponse(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}

async function generateRandomCard(username: string) {
  const promptData = mainData.card_generation.promptWeights;
  const alterationChance = mainData.card_generation.alterChance;
  const statlines = mainData.card_generation.statlines;

  const randomType = getWeightedRandom(promptData, 1)[0];
  const randomStatline = getWeightedRandom(statlines, 1)[0];
  console.log(randomStatline);

  let alteration = "null";
  if (Math.random() < alterationChance) {
    alteration = getWeightedRandom(randomType.alters, 1)[0].value;
  }

  const imageOptions = await UnclaimedImage.find({
    type: randomType.prompt,
    alterations: alteration,
    promptVersion: { $in: ["1.12", "1.11"] },
  });

  let imageSrc = "";
  if (imageOptions.length > 0) {
    const randomImage =
      imageOptions[Math.floor(Math.random() * imageOptions.length)];
    imageSrc = randomImage.photo.replace(
      "storage.cloud.google.com",
      "storage.googleapis.com"
    );
  }

  const cardEffect = "This is a random effect for " + randomType.prompt;

  return {
    username,
    imageSrc,
    type: randomType.prompt,
    alteration,
    cost: randomStatline.stats.cost,
    defence: randomStatline.stats.defence,
    attack: randomStatline.stats.attack,
    contribution: randomStatline.stats.contribution,
    effect: cardEffect,
    onSale: false,
  };
}

function getWeightedRandom(input: any[], number: number) {
  const array = [];
  let items = [...input];

  for (let i = 0; i < number; i++) {
    const totalWeight = items.reduce(
      (total, item) => total + parseFloat(item.probability),
      0
    );
    const randomValue = Math.random() * totalWeight;
    let weightSum = 0;

    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      weightSum += parseFloat(item.probability);

      if (randomValue <= weightSum) {
        array.push(item);
        items.splice(j, 1);
        break;
      }
    }
  }

  return array;
}
