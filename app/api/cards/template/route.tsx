import { NextResponse, NextRequest } from 'next/server'
import UnclaimedImage from '@/app/_mongoDB/models/UnclaimedImage';
import Card from '@/app/_mongoDB/models/Card';
import mainData from '@/app/_data/mainData.json';
import { connectDB } from '@/app/_mongoDB/connect';

export async function GET(request: NextRequest) { 

    try {

        await connectDB();

        const promptData = mainData.card_generation.promptWeights;
        const alterationChance = mainData.card_generation.alterChance;
        const statlines = mainData.card_generation.statlines;

        const randomStatlines = getWeightedRandom(statlines, 3);

        let finding = true;

        let randomTypes;

        while (finding){

            finding = false;

            randomTypes = getWeightedRandom(promptData, 3);

            // Check the randomStatlines and randomTypes are both arrays of length 3
            if (randomStatlines.length !== 3 || randomTypes.length !== 3){
                return new Response(JSON.stringify({'message': 'Issue Generating Types || Statlines'}), { status: 409 } );
            }
    
            // Generate Alterations
            await Promise.all(randomTypes.map(async(type:any) => {

                type.alterations = "null";
                
                if (Math.random() < alterationChance){
                    let alterations = await getWeightedRandom(type.alters, 1);
                    type.alterations = alterations[0].value;
                }

            }))
    
            // Generate Images
            await Promise.all(randomTypes.map(async(type:any) => {
    
                let imageOptions = await UnclaimedImage.find({type: type.prompt, alterations: type.alterations,   promptVersion: {
                    $in: ['1.12', '1.11']
                }});
    
                let number_of_images = imageOptions.length;
                
                if (number_of_images < 3){
                   finding = true;
                }
                else {
    
                    let one = 0; let two = 0; let three = 0;
        
                    while (one == two || two == three || three == one){
                        one = Math.floor(Math.random() * number_of_images);
                        two = Math.floor(Math.random() * number_of_images);
                        three = Math.floor(Math.random() * number_of_images);
                    }
        
                    imageOptions = [imageOptions[one], imageOptions[two], imageOptions[three]]
        
                    imageOptions = imageOptions.map((image) => {
                        let new_image = image;
                        new_image.photo = image.photo.replace("storage.cloud.google.com", "storage.googleapis.com")
                        return new_image;
                    })
                    
                    type.imageOptions = imageOptions;
    
                }
            }))
    
            // Generate Effects
            await Promise.all(randomTypes.map(async (type: any) => {
    
                let cardEffects = ["This is effect 1", "This is effect 2", "This is effect 3"];
    
                if (cardEffects.length < 3){
                    return new Response(JSON.stringify({'message': 'Issue Generating Image Options'}), { status: 409 } );
                }
    
                type.cardEffects = cardEffects;
    
            }));

        }

        const returnData = {randomTypes, randomStatlines};

        const headers = new Headers(request.headers)
        headers.set('Cache-Control', 'no-cache');
        return new NextResponse(JSON.stringify({data: returnData, headers: headers}), { status: 200 } );

    }
    catch(error) {
        return new Response(JSON.stringify({'message': 'Server Error', 'error': error}), { status: 409 } );
        
    }


}

const getWeightedRandom = (input: any, number: number) => {
    
    // get 3 weighted random statlines based on their probability
    const array = [];
    let items = [...input]; // create a copy of the input array

    for (let i = 0; i < number; i++){

        // Calculate total weight
        const totalWeight = items.reduce((total: number, item: any) => total + parseFloat(item.probability), 0);

        // Get a random value between 0 and total weight
        const randomValue = Math.random() * totalWeight;

        let weightSum = 0;

        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            weightSum += parseFloat(item.probability);

            if (randomValue <= weightSum) {
                array.push(item);
                items.splice(j, 1); // remove the selected item from the array
                break;
            }
        }
    }

    return array;
}