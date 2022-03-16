"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUser = exports.checkAdmin = void 0;

var _jwt = require("./jwt");

const checkAdmin = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    const payload = (0, _jwt.decodeToken)(token);
    if (payload.role == "admin") return next();
    return res.status(401).json({
      status: "fail",
      message: "you are not allowed to access this service"
    });
  }

  return res.status(401).json({
    status: "fail",
    message: "Not Authorized , please login"
  });
};

exports.checkAdmin = checkAdmin;

const checkUser = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    const payload = (0, _jwt.decodeToken)(token);

    if (payload.role == "standard-user") {
      req.currentUser = payload;
      return next();
    }

    return res.status(401).json({
      status: "fail",
      message: "you are not allowed to access this service"
    });
  }

  return res.status(401).json({
    status: "fail",
    message: "Not Authorized , please login"
  });
};

exports.checkUser = checkUser;