"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newsLetterEmail = exports.getAllSubscribers = exports.deleteNewsById = void 0;

var _newsletter = _interopRequireDefault(require("../database/model/newsletter.model"));

var _index = require("../validate/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsLetterEmail = async (req, res) => {
  const {
    error
  } = (0, _index.newsletterValidation)(req.body);
  if (error) return res.status(400).json({
    message: error.details[0].message
  });
  let oldemail = await _newsletter.default.findOne(req.body);

  if (oldemail) {
    return res.status(400).json({
      status: "fail",
      message: "email Exists"
    });
  }

  const newsletter = req.body;
  const saveData = new _newsletter.default(newsletter);
  await saveData.save();
  res.status(201).json({
    status: "success",
    data: saveData
  });
};

exports.newsLetterEmail = newsLetterEmail;

const getAllSubscribers = async (req, res) => {
  const news = await _newsletter.default.find();
  res.status(200).json({
    status: true,
    data: news
  });
};

exports.getAllSubscribers = getAllSubscribers;

const deleteNewsById = async (req, res) => {
  const {
    id
  } = req.params;
  const news = await _newsletter.default.findById(id);
  if (!news) return res.status(404).json({
    status: "fail",
    message: "email not found"
  });
  await _newsletter.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "email deleted",
    data: "Null"
  });
};

exports.deleteNewsById = deleteNewsById;