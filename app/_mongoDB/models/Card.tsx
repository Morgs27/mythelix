import mongoose, {Schema} from "mongoose"

const cardSchema = new Schema({
    username: String,
    imageSrc: String,
    cost: String,
    contribution: String,
    onSale: Boolean,
    type: String,

    attack: Number,
    defence: Number,
    name: String, 
    effect: String,
    alteration: String,
}, {
    timestamps: true
})

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema)

export default Card;
