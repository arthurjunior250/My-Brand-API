"use strict";

require("dotenv/config");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT;

_app.default.listen(port, () => {
  console.log("Server listening on port " + port);
});