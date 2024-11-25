const mongoose = require('mongoose')
const { Schema } = mongoose
const tagSchema = new Schema({
    //for hashtags that need to be converted to strings. using trim to trim extra spaces
    name: { type: String, trim: true, required: true, unique: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    channels: [{ type: Schema.Types.ObjectId, ref: "Channel" }],
})
const Tag = mongoose.model("Tag", tagSchema)
module.exports = Tag 