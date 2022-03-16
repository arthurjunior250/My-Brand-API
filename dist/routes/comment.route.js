"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _comment = require("../controllers/comment.controller");

var _check = require("../middleware/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/:id/comment", _check.checkUser, _comment.saveComment); // router.get("/:blogId/comment/:commentId", getAllComments);
// router.delete("/:id", checkAdmin, deleteComment);

var _default = router;
exports.default = _default;