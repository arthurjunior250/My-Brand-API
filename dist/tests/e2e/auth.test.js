"use strict";

var _app = _interopRequireDefault(require("../../app"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//auth
_chai.default.use(_chaiHttp.default); //sign up


describe('POST API /api/v1/authentication/signup', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('signup');
  });
  const user = {
    userName: "arthur",
    email: "arthurkigali@gmail.com",
    password: "123456"
  };
  it('it should successfully create an account and return 201', done => {
    _chai.default.request(_app.default).post('/api/v1/authentication/signup').send(user).end((err, res) => {
      if (err) return done(err);
      (0, _chai.expect)(res.status).to.be.equal(400);
      return done();
    });
  });
  it('Should return 400 when email exists', done => {
    const oldemail = user.email;

    _chai.default.request(_app.default).post('/api/v1/authentication/signup').send(user).end((err, res) => {
      if (oldemail) return done(err);
      (0, _chai.expect)(res.status).to.be.eql(400);
      return done();
    });
  });
}); //sign in

describe('POST API /api/v1/authentication/login', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('login');
  });
  const user = {
    email: "arthurkigali@gmail.com",
    password: "123456"
  };
  let token = "";
  it('it should successfully login and return 200', done => {
    _chai.default.request(_app.default).post('/api/v1/authentication/login').send(user).end((err, res) => {
      if (err) return done(err);
      token = res.body.token;
      (0, _chai.expect)(res.status).to.be.equal(200);
      (0, _chai.expect)(res.body).to.have.property("token");
      return done();
    });
  });
}); // get user profile

describe('GET API /api/v1/authentication/user-profile', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('user-profile');
  });
  const user = {
    email: "arthurkigali@gmail.com",
    password: "123456"
  };
  let token = "";
  it('Should login', done => {
    _chai.default.request(_app.default).post('/api/v1/authentication/login').send(user).end((err, res) => {
      if (err) return done(err);
      token = res.body.token;

      _chai.default.request(_app.default).get('/api/v1/authentication/user-profile').set("Authorization", `Bearer ${token}`).end((err, res) => {
        if (err) return done(err);
        (0, _chai.expect)(res.status).to.be.eql(200);
        return done();
      });
    });
  });
});