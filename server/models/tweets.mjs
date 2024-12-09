import mongoose, { Schema } from 'mongoose'


const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        fullName: String,
        email: String,
        picture: String
    }
}, {timestamps: true})


export default mongoose.model('Tweets', tweetSchema)