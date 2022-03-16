"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.NODE_ENV;
const dev_db_url = process.env.DB_DEVELOPMENT_URL;
const prod_db_url = process.env.DB_PRODUCTION_URL;
const test_db_url = process.env.DB_TESTING_URL;
const connectionUrl = env == "development" ? dev_db_url : env == "production" ? prod_db_url : test_db_url;

_mongoose.default.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("App connected to Mongodb successfully");
  console.log(connectionUrl);
}).catch(e => {
  console.log("Mongodb connection error " + e.message);
});