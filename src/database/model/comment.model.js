import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({

    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },

})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;