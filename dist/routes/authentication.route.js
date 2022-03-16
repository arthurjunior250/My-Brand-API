"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authentication = require("../controllers/authentication.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/signup', _authentication.signup);
router.post('/login', _authentication.login);
router.get('/user-profile', _authentication.userProfile);
var _default = router;
exports.default = _default;