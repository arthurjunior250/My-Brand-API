import Comment from '../database/model/comment.model';
import { commentValidation } from "../validate/index";
import Blog from '../database/model/blog.model';

export const saveComment = async(req, res) => {
    const blogId = req.params.id;
    const { error } = commentValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newComment = await Comment.create({
        names: req.body.names,
        email: req.body.email,
        comment: req.body.comment,
        blogPost: blogId,
    });
    const blogPost = await Blog.findById(blogId);
    blogPost.comments.push(newComment);
    await blogPost.save(function(error) {
        res.status(201).json({ status: "success", data: newComment });
    });
};

export const getAllComments = async(req, res) => {
    const blogId = req.params.id;
    const getComment = await Blog.findById(blogId).populate("comments");
    res.status(200).json({ status: "success", data: getComment.comments });
};

export const deleteComment = async(req, res) => {
    const { id } = req.params;
    const comment = await Blog.findById(id);
    if (!comment)
        return res
            .status(204)
            .json({ status: false, message: "Comment not found" });
    await Comment.findByIdAndDelete(id);
    res
        .status(201)
        .json({ status: "success", message: "Comment deleted", data: comment });
};