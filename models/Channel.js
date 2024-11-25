const mongoose = require("mongoose")
const { Schema } = mongoose
const ChannelSchema = new Schema({
  name: { type: String, required: true, trim: true },
  uid: { type: String, sparse: true },//uniqueid
  email: { type: String, trim: true },
  handle: { type: String, required: true, trim: true, sparse: true },//username 
  description: { type: String, trim: true }, //description of video 
  logoURL: { type: String, trim: true },
  bannerImageURL: { type: String, trim: true },//uper jo pic dikhti h banner jesi horizontally
  createdDate: { type: Date, default: Date.now },//when created
  subscribers: [{ type: Schema.Types.ObjectId, ref: "Channel" }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],//tags of channel
  subscriptions: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
  collectionId: { type: String, sparse: true },//realated to bunny when video uploaded on bunny a folder will form according to name of channel thi is call collection id
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }]
})
// Adding partial indexes //to access and search all the data mentioned below would be more efficient and easy
ChannelSchema.index({ uid: 1 }, { unique: true, partialFilterExpression: { uid: { $exists: true, $ne: null } } })
ChannelSchema.index({ handle: 1 }, { unique: true, partialFilterExpression: { handle: { $exists: true, $ne: null } } })
ChannelSchema.index({ collectionId: 1 }, { unique: true, partialFilterExpression: { collectionId: { $exists: true, $ne: null } } })
ChannelSchema.index({ name: 'text', description: 'text' })
const Channel = mongoose.model("Channel", ChannelSchema)
module.exports = Channel