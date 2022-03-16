"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentSchema = new _mongoose.default.Schema({
  comment: {
    type: String,
    required: true
  },
  blogPost: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Blog"
  },
  owner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Comment = _mongoose.default.model('Comment', commentSchema);

var _default = Comment;
exports.default = _default;