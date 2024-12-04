import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    picture: {
        type: String
    }
})


export default mongoose.model('Users', userSchema)