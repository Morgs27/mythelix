import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    username: String,
    password: String,
    rank: String,
    level: String,
    buildTokens: String,
    crystals: String,
    friends: String
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;
