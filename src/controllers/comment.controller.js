import Comment from '../database/model/comment.model';
import { commentValidation } from "../validate/index";
import Blog from '../database/model/blog.model';

export const saveComment = async(req, res) => {
    const blogId = req.params.id;
    const { error } = commentValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newComment = await Comment.create({
        comment: req.body.comment,
        blogPost: blogId,
        owner: req.currentUser._id,
    });
    const blogPost = await Blog.findById(blogId);
    blogPost.comments.push(newComment);
    await blogPost.save(function(error) {
        res.status(201).json({ status: "success", data: newComment });
    });
};

export const getAllComments = async(req, res) => {
    const blogId = req.params.id;
    const getAllComment = await Comment.find({ blogPost: blogId }).populate(
		"owner"
	);
    res.status(200).json({ status: "success", data:getAllComment});
};

export const deleteComment = async(req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment)
        return res
            .status(204)
            .json({ status: false, message: "Comment not found" });
    await Comment.findByIdAndDelete(id);
    res
        .status(201)
        .json({ status: "success", message: "Comment deleted", data: comment });
};

export const getSingleComment = async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.findById(id);
	if (!comment)
		return res
			.status(204)
			.json({ status: false, message: "Comment not found" });
	res
		.status(201)
		.json({ status: "success", message: "Comment found", data: comment });
};
