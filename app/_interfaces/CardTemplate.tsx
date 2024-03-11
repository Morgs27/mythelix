export default interface CardTemplateInterface {
    randomTypes: {
        prompt: string,
        alterations: string | "null",
        imageOptions: {
            // Structure for each image option object
            _id: string,
            photo: string,
            type: string,
            alterations: string | "null",
            promptVersion: string,
            prompt: string,
        }[];
        cardEffects: string[],
        probability: string,
        alters: any,
    }[];
    randomStatlines: {
        probability: number,
        stats: {
            attack: number,
            contribution: number,
            cost: number,
            defence: number,
        }
    }[];
}