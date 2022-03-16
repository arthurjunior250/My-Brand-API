"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _newsletter = require("../controllers/newsletter.controller");

var _check = require("../middleware/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _newsletter.newsLetterEmail);
router.delete('/:id', _check.checkAdmin, _newsletter.deleteNewsById);
router.get('/', _check.checkAdmin, _newsletter.getAllSubscribers);
var _default = router;
exports.default = _default;