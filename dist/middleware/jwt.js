"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = exports.decodeToken = void 0;

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const private_key = process.env.PRIVATE_KEY;

const signToken = payload => {
  return _jsonwebtoken.default.sign(payload, private_key);
};

exports.signToken = signToken;

const decodeToken = token => {
  return _jsonwebtoken.default.decode(token, private_key);
};

exports.decodeToken = decodeToken;