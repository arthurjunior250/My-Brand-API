"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = exports.signup = exports.login = void 0;

var _user = _interopRequireDefault(require("../database/model/user.model"));

var _hashPassword = require("../middleware/hash-password");

var _jwt = require("../middleware/jwt");

var _emailValidator = _interopRequireDefault(require("email-validator"));

var _index = require("../validate/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signup = async (req, res) => {
  const {
    error
  } = (0, _index.registerValidation)(req.body);
  if (error) return res.status(400).json({
    message: error.details[0].message
  });

  if (_emailValidator.default.validate(req.body.email)) {
    let user = await _user.default.findOne({
      email: req.body.email
    });

    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "Email Exists"
      });
    }

    user = req.body;
    user.password = await (0, _hashPassword.hash)(user.password);
    const newUser = await new _user.default(user);
    newUser.save();
    res.status(201).json({
      status: "success",
      message: "User created"
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "invalid email"
    });
  }
};

exports.signup = signup;

const login = async (req, res) => {
  const {
    password,
    email
  } = req.body;
  let user = await _user.default.findOne({
    email
  });
  if (!user) return res.status(401).json({
    status: "fail",
    message: "Invalid email or password"
  });
  const isPasswordValid = await (0, _hashPassword.verify)(user.password, password);
  if (!isPasswordValid) return res.status(401).json({
    status: "fail",
    message: "Invalid email or password"
  });
  const {
    _id,
    firstName,
    lastName,
    role
  } = user;
  const token = (0, _jwt.signToken)(JSON.stringify({
    _id,
    firstName,
    lastName,
    role,
    email: user.email
  }));
  return res.status(200).json({
    status: "success",
    message: "successfully logged in",
    token
  });
};

exports.login = login;

const userProfile = (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  const payload = (0, _jwt.decodeToken)(token);
  return res.status(200).json({
    status: true,
    data: payload
  });
};

exports.userProfile = userProfile;