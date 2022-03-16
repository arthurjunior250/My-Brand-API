"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComment = exports.getAllComments = exports.deleteComment = void 0;

var _comment = _interopRequireDefault(require("../database/model/comment.model"));

var _index = require("../validate/index");

var _blog = _interopRequireDefault(require("../database/model/blog.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveComment = async (req, res) => {
  const blogId = req.params.id;
  const {
    error
  } = (0, _index.commentValidation)(req.body);
  if (error) return res.status(400).json({
    message: error.details[0].message
  });
  const newComment = await _comment.default.create({
    comment: req.body.comment,
    blogPost: blogId,
    owner: req.currentUser._id
  });
  const blogPost = await _blog.default.findById(blogId);
  blogPost.comments.push(newComment);
  await blogPost.save(function (error) {
    res.status(201).json({
      status: "success",
      data: newComment
    });
  });
};

exports.saveComment = saveComment;

const getAllComments = async (req, res) => {
  const blogId = req.params.id;
  const getComment = await _blog.default.findById(blogId).populate("comments");
  res.status(200).json({
    status: "success",
    data: getComment.comments
  });
};

exports.getAllComments = getAllComments;

const deleteComment = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await _blog.default.findById(id);
  if (!comment) return res.status(204).json({
    status: false,
    message: "Comment not found"
  });
  await _comment.default.findByIdAndDelete(id);
  res.status(201).json({
    status: "success",
    message: "Comment deleted",
    data: comment
  });
};

exports.deleteComment = deleteComment;