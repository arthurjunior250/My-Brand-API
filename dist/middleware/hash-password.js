"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.hash = void 0;

var _argon = _interopRequireDefault(require("argon2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hash = async password => {
  return await _argon.default.hash(password);
};

exports.hash = hash;

const verify = async (hashedPassword, plainPassword) => {
  return await _argon.default.verify(hashedPassword, plainPassword);
};

exports.verify = verify;