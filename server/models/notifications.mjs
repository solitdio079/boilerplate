import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    target: {
        type: String
    },
    action: String
})

export default mongoose.model('Notifications', notificationSchema)