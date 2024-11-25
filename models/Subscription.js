const mongoose = require("mongoose")
const { Schema } = mongoose
const SubscriptionSchema = new Schema({
    //whos subscribed
    subscriber: { type: Schema.Types.ObjectId, ref: "Channel", required: true },
    //which channels are subscribed
    channel: { type: Schema.Types.ObjectId, ref: "Channel", required: true },
    //notification mode: whether you want to allow notifications to be delivered or not 
    mode: { type: String, enum: ["silent", "notification"], required: true }
})
const Subscription = mongoose.model("Subscription", SubscriptionSchema)
module.exports = Subscription