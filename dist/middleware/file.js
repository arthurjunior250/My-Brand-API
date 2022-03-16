"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = void 0;

var _image = _interopRequireDefault(require("./image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileUpload = async req => {
  let imageUrl = "";
  await _image.default.v2.uploader.upload(req.file.path, async function (err, image) {
    if (err) {
      console.log(err);
    }

    imageUrl = image.url;
  });
  return imageUrl;
};

exports.fileUpload = fileUpload;