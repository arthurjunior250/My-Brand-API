"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./database");

var _express = _interopRequireDefault(require("express"));

var _inquiry = _interopRequireDefault(require("./routes/inquiry.route"));

var _blog = _interopRequireDefault(require("./routes/blog.route"));

var _authentication = _interopRequireDefault(require("./routes/authentication.route"));

var _comment = _interopRequireDefault(require("./routes/comment.route"));

var _newsletter = _interopRequireDefault(require("./routes/newsletter.route"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _api = _interopRequireDefault(require("../api.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//swagger-ui
const server = (0, _express.default)(); // default route

server.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "You successfully landed on My brand app API"
  });
});
server.use(_express.default.json());
server.use('/api/v1/inquiry', _inquiry.default);
server.use('/api/v1/blog', _blog.default);
server.use('/api/v1/authentication', _authentication.default);
server.use('/api/v1/newsletter', _newsletter.default);
server.use('/api/v1/blog', _comment.default);
var _default = server; // swagger-ui

exports.default = _default;
server.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_api.default, {
  explorer: true
}));
server.use("*", (req, res, next) => {
  res.status(404).json({
    error: "NOT FOUND"
  });
});