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
    },
    notifUrl: {
        type: Object
    }
})


export default mongoose.model('Users', userSchema)