import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;