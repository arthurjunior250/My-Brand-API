// import Blog from '../database/model/blog.model';

// export const saveBlog = async(req, res) => {
//     const blog = req.body;
//     const newBlog = new Blog(Blog);
//     await newBlog.save();
//     res.status(201).json({ success: true, data: newBlog });
// }

// export const getAllBlogs = async(req, res) => {
//     const blogs = await Blog.find();
//     res.status(200).json({ success: true, data: blogs })
// }

// export const getById = async(req, res) => {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, data: blog });
// }

// export const updateBlog = async(req, res) => {
//     const { id } = req.params;
//     const updates = req.body;
//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     await Blog.findByIdAndUpdate(id, updates);
//     res.status(200).json({ success: true, message: "Blog updated successfully" })
// }

// export const deleteBlogById = async(req, res) => {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     await Blog.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Blog deleted", data: blog });
// }