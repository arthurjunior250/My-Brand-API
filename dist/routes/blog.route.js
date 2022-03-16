"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _blog = require("../controllers/blog.controller");

var _check = require("../middleware/check");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); //image


const storage = _multer.default.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const uploads = (0, _multer.default)({
  storage,
  fileFilter
});
router.post('/', _check.checkAdmin, uploads.single("image"), _blog.saveBlog);
router.put('/:id', _check.checkAdmin, _blog.updateBlog);
router.delete('/:id', _check.checkAdmin, _blog.deleteBlogById);
router.get('/', _blog.getAllBlogs);
router.get('/:id', _blog.getblogById);
var _default = router;
exports.default = _default;