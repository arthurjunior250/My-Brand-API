"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileFilter = void 0;

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("File type is not supported", false);
  }
};

exports.fileFilter = fileFilter;