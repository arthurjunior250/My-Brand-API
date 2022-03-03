import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Blog = mongoose.model('Task', blogSchema);
export default Blog;