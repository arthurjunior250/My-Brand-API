"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _inquiry = require("../controllers/inquiry.controller");

var _check = require("../middleware/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _inquiry.saveInquiry);
router.get('/', _check.checkAdmin, _inquiry.getAllInquiries);
router.get('/:id', _check.checkAdmin, _inquiry.getInquiryById);
router.delete('/:id', _check.checkAdmin, _inquiry.deleteInquiryById);
var _default = router;
exports.default = _default;