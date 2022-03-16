"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidation = exports.queryValidation = exports.newsletterValidation = exports.commentValidation = exports.blogValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// query validation
const queryValidation = data => {
  const schema = _joi.default.object({
    names: _joi.default.string().min(4).required(),
    email: _joi.default.string().min(10).required().email(),
    message: _joi.default.string().min(3).required()
  });

  return schema.validate(data);
}; //User validation


exports.queryValidation = queryValidation;

const registerValidation = data => {
  const schema = _joi.default.object({
    userName: _joi.default.string().min(2).required(),
    email: _joi.default.string().min(6).required().email(),
    role: _joi.default.string().min(2),
    password: _joi.default.string().min(6).required()
  });

  return schema.validate(data);
}; //blog validation


exports.registerValidation = registerValidation;

const blogValidation = data => {
  const schema = _joi.default.object({
    image: _joi.default.string(),
    title: _joi.default.string().min(4).required(),
    description: _joi.default.string().min(100).required()
  });

  return schema.validate(data);
}; // newsletter


exports.blogValidation = blogValidation;

const newsletterValidation = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().min(6).required().email()
  });

  return schema.validate(data);
}; //comment validation


exports.newsletterValidation = newsletterValidation;

const commentValidation = data => {
  const schema = _joi.default.object({
    // names: Joi.string().min(4).required(),
    // email: Joi.string().min(10).required().email(),
    comment: _joi.default.string().min(2).required()
  });

  return schema.validate(data);
};

exports.commentValidation = commentValidation;