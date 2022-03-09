import Inquiry from '../database/model/inquiry.model';
import { queryValidation, newsletterValidation, commentValidation } from "../validate/index";
import newsLetters from '../database/model/newsletter.model';
import Blog from '../database/model/blog.model';
import Comment from '../database/model/comment.model';


//query&questions

export const saveInquiry = async(req, res) => {
    const { error } = queryValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const inquiry = req.body;
    const newInquiry = new Inquiry(inquiry);
    await newInquiry.save();
    res.status(201).json({ status: "success", data: newInquiry });
}



// newsletter

export const newsLetterEmail = async(req, res) => {
    const { error } = newsletterValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let oldemail = await newsLetters.findOne(req.body);
    if (oldemail) {
        return res.status(400).json({
            status: "fail",
            message: "email Exists",
        });
    }
    const newsletter = req.body;
    const saveData = new newsLetters(newsletter);
    await saveData.save();
    res.status(201).json({ status: "success", data: saveData });
}


//blog
export const getblogById = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Blog not found" });
    res.status(200).json({ status: true, data: blog });
}
export const getAllBlogs = async(req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({ status: true, data: blogs })
}

//comments

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