"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.saveBlog = exports.getblogById = exports.getAllBlogs = exports.deleteBlogById = void 0;

var _blog = _interopRequireDefault(require("../database/model/blog.model"));

var _index = require("../validate/index");

var _file = require("../middleware/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveBlog = async (req, res, next) => {
  const {
    error
  } = (0, _index.blogValidation)(req.body);
  if (error) return res.status(400).json({
    message: error.details[0].message
  });
  let oldblog = await _blog.default.findOne(req.body);

  if (oldblog) {
    return res.status(400).json({
      status: "fail",
      message: "blog Exists"
    });
  } //image


  if (req.file) {
    req.body.image = await (0, _file.fileUpload)(req);
  } else {
    req.body.image = "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  }

  const blog = {
    image: req.body.image,
    title: req.body.title,
    description: req.body.description
  };
  const newBlog = new _blog.default(blog);
  await newBlog.save();
  res.status(201).json({
    status: "success",
    data: newBlog
  });
};

exports.saveBlog = saveBlog;

const updateBlog = async (req, res) => {
  const {
    id
  } = req.params;
  const updates = req.body;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "Blog not found"
  });
  await _blog.default.findByIdAndUpdate(id, updates);
  res.status(200).json({
    status: "success",
    message: "Blog updated successfully"
  });
};

exports.updateBlog = updateBlog;

const deleteBlogById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "Blog not found"
  });
  await _blog.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Blog deleted"
  });
};

exports.deleteBlogById = deleteBlogById;

const getblogById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "Blog not found"
  });
  res.status(200).json({
    status: true,
    data: blog
  });
};

exports.getblogById = getblogById;

const getAllBlogs = async (req, res) => {
  const blogs = await _blog.default.find();
  res.status(200).json({
    status: true,
    data: blogs
  });
};

exports.getAllBlogs = getAllBlogs;