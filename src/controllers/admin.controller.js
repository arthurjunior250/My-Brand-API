import Blog from '../database/model/blog.model';
import { blogValidation } from "../validate/index";
import Inquiry from '../database/model/inquiry.model';
import newsLetters from '../database/model/newsletter.model';
import { fileUpload } from "../helpers/file";

//blogs

export const saveBlog = async(req, res, next) => {
    const { error } = blogValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let oldblog = await Blog.findOne(req.body);
    if (oldblog) {
        return res.status(400).json({
            status: "fail",
            message: "blog Exists",
        });
    }
    //image
    if (req.file) {
        req.body.image = await fileUpload(req);
    } else {
        req.body.image =
            "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
    }
    const blog = {
        image: req.body.image,
        title: req.body.title,
        description: req.body.description
    };
    const newBlog = new Blog(blog);
    await newBlog.save();
    res.status(201).json({ status: "success", data: newBlog });
}



export const updateBlog = async(req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Blog not found" });
    await Blog.findByIdAndUpdate(id, updates);
    res.status(200).json({ status: "success", message: "Blog updated successfully" })
}

export const deleteBlogById = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Blog not found" });
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "Blog deleted" });
}

//query

export const getAllInquiries = async(req, res) => {
    const inquiries = await Inquiry.find();
    res.status(200).json({ status: true, data: inquiries })
}

export const getInquiryById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ status: "fail", message: "Inquiry not found" });
    res.status(200).json({ status: true, data: inquiry });
}

export const deleteInquiryById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ status: "fail", message: "Inquiry not found" });
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "Inquiry deleted", data: "Null" });
}


//newsletter


export const getAllSubscribers = async(req, res) => {
    const news = await newsLetters.find();
    res.status(200).json({ status: true, data: news })
}

export const deleteNewsById = async(req, res) => {
    const { id } = req.params;
    const news = await newsLetters.findById(id);
    if (!news) return res.status(404).json({ status: "fail", message: "email not found" });
    await newsLetters.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "email deleted", data: "Null" });
}