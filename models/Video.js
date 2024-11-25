const { upload } = require('@lib/db')
const mongoose = require('mongoose')
const { Schema } = mongoose
const videoSchema = new Schema({
    //videos own id 
    videoId: { type: String, required: true },
    //title of video
    title: { type: String, required: true },
    //the name by which files is being uploaded
    filename: { type: String, required: true },
    //a specific uniqueid for the video
    uid: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    likes: [{ type: Schema.Types.ObjectId, ref: "Channel" }],
    //if the video is not uploaded but created then it should be stored in drafts
    isDraft: { type: Boolean, default: true },
    //feature of youtube shorts
    isShort: { type: Boolean, default: false },
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Channel" }],
    //is commnets are allowed or not 
    commentsStatus: { type: Boolean, default: true },
    //number of comments
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    hashTags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    uploadDate: { type: Date },
    length: { type: Number },
    aspect: { type: Number },//aspect ratio will decide whether it is a video or a short
    category: { type: String },//specific category of a video
    privacySettings: {
        type: String,
        trim: true,
        default: 'private',//initially it is private if nothing is not mentioned video will be private
        enum: ['public', 'unlisted', 'private']//whenever we provide anything on enum then amongst the three value any one value will be returned and it is mandatory
    },
    viewsEnabled: { type: Boolean, default: true },//number of views
    status: { type: String, trim: true, default: 'Uploading' },//initally everyvideo will be in uploading status then it will be changed to encoding status then it proceeds to uploaded status
    channel: { type: Schema.Types.ObjectId, ref: "Channel" }//which channel uploaded the video
}, { timestamps: true })//tels the dated of uploaded encoded

//indexing 
videoSchema.index({ title: 'text', description: 'text' })
videoSchema.index({ channel: 1 })
videoSchema.index({ length: 1 })
videoSchema.index({ privacySettings: 1 })
videoSchema.index({ uploadDate: 1 })
const Video = mongoose.model("Video", videoSchema)
module.exports = Video