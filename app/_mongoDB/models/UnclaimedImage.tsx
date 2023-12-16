import mongoose, {Schema} from "mongoose"

const UnclaimedImageSchema = new Schema({
    prompt: { type: String, required: true},
    type: {type: String, required: true},
    alterations: {type: String, required: true},
    photo: { type: String, required: true},
    promptVersion: {type: String, required: true}
}, {
    timestamps: true
})

const UnclaimedImage = mongoose.models.UnclaimedImage || mongoose.model("UnclaimedImage", UnclaimedImageSchema)

export default UnclaimedImage;