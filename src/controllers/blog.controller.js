import Blog from '../database/model/blog.model';
import { blogValidation } from "../validate/index";


import { fileUpload } from "../middleware/file";

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
            "https://www.linkpicture.com/q/blog_4.png";
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

export const getblogById = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Blog not Found" });
    res.status(200).json({ status: true, data: blog });
}
export const getAllBlogs = async(req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({ status: true, data: blogs })
}

//blog