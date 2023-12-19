import mongoose, {Schema} from "mongoose"

const cardSchema = new Schema({
    username: String,
    imageSrc: String,
    cost: String,
    contribution: String,
    onSale: Boolean,
    name: String, 
    description: String,
    type: String,
    alterations: String,
}, {
    timestamps: true
})

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema)

export default Card;
