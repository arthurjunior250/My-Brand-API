"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = _mongoose.default.Schema({
  userName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['standard-user', 'admin'],
    default: 'standard-user'
  },
  password: {
    type: String,
    required: true
  }
});

const User = _mongoose.default.model('User', UserSchema);

var _default = User;
exports.default = _default;