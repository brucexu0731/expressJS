import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribeToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Subscriber = mongoose.model("Subscriber", subscriberSchema)
export default Subscriber