"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  }
});

const News = _mongoose.default.model('News', newsSchema);

var _default = News;
exports.default = _default;