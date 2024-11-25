const mongoose = require('mongoose')
const { Schema } = mongoose
const commentSchema = new Schema({
    //on nwhich video the comment is inserted
    video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    //on which channel 
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    //what comment is inserted
    text: { type: String, trim: true, required: true },
    //when the comment is inserted
    postedDate: { type: Date, default: Date.now },
    //number of likes
    likes: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
    //replies on comment 
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})
const Comment = mongoose.model('Comment', commentSchema)
//exporting to use in future
module.exports = Comment