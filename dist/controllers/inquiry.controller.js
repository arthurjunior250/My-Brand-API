"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveInquiry = exports.getInquiryById = exports.getAllInquiries = exports.deleteInquiryById = void 0;

var _inquiry = _interopRequireDefault(require("../database/model/inquiry.model"));

var _index = require("../validate/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveInquiry = async (req, res) => {
  const {
    error
  } = (0, _index.queryValidation)(req.body);
  if (error) return res.status(400).json({
    message: error.details[0].message
  });
  const inquiry = req.body;
  const newInquiry = new _inquiry.default(inquiry);
  await newInquiry.save();
  res.status(201).json({
    status: "success",
    data: newInquiry
  });
};

exports.saveInquiry = saveInquiry;

const getAllInquiries = async (req, res) => {
  const inquiries = await _inquiry.default.find();
  res.status(200).json({
    status: true,
    data: inquiries
  });
};

exports.getAllInquiries = getAllInquiries;

const getInquiryById = async (req, res) => {
  const {
    id
  } = req.params;
  const inquiry = await _inquiry.default.findById(id);
  if (!inquiry) return res.status(404).json({
    status: "fail",
    message: "Inquiry not found"
  });
  res.status(200).json({
    status: true,
    data: inquiry
  });
};

exports.getInquiryById = getInquiryById;

const deleteInquiryById = async (req, res) => {
  const {
    id
  } = req.params;
  const inquiry = await _inquiry.default.findById(id);
  if (!inquiry) return res.status(404).json({
    status: "fail",
    message: "Inquiry not found"
  });
  await _inquiry.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Inquiry deleted",
    data: "Null"
  });
};

exports.deleteInquiryById = deleteInquiryById;