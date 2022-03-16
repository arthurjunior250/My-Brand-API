"use strict";

var _app = _interopRequireDefault(require("../../app"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//query
_chai.default.use(_chaiHttp.default); //post query


describe('POST API /api/v1/inquiry', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('query');
  });
  const query = {
    names: "junior",
    email: "arthurjunior88741@gmail.com",
    message: "hey"
  }; // should successfully create a query

  it('it should successfully create query and return 201', done => {
    _chai.default.request(_app.default).post('/api/v1/inquiry').send(query).end((err, res) => {
      if (err) return done(err);
      (0, _chai.expect)(res.status).to.be.equal(201);
      return done();
    });
  });
}); //sign up

describe('POST API /api/v1/authentication/signup', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('signup');
  });
  const user = {
    userName: "arthur",
    email: "arthurkigali1@gmail.com",
    role: "admin",
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
  }); //sign in

  describe('POST API /api/v1/authentication/login', () => {
    before(() => {
      _mongoose.default.connection.dropCollection('login');
    });
    const user = {
      email: "arthurkigali1@gmail.com",
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
    }); // //post blog
    //get blog by id
    //delete blog by id
    // //get query

    describe('GET API /api/v1/query', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('query');
      });
      const query = {
        names: "junior",
        email: "arthurjunior88741@gmail.com",
        message: "hey"
      }; // should get list of queries

      it('Should get the list of query', done => {
        _chai.default.request(_app.default).post('/api/v1/inquiry').send(query).end((err, res) => {
          if (err) return done(err);

          _chai.default.request(_app.default).get('/api/v1/inquiry').set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
    }); //get query by id

    describe('GET API /api/v1/query/:id', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('query');
      });
      const query = {
        names: "junior",
        email: "arthurjunior88741@gmail.com",
        message: "hey"
      };
      let queryId; // should successfully get query by id

      it('Should get single query by id', done => {
        _chai.default.request(_app.default).post('/api/v1/inquiry').send(query).end((err, res) => {
          if (err) return done(err);
          queryId = res.body.data._id;

          _chai.default.request(_app.default).get('/api/v1/inquiry/' + queryId).set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
      it('Should return 404 when qquery does not exists', done => {
        const fakeId = '1229b52ca50601182da72457';

        _chai.default.request(_app.default).get('/api/v1/inquiry/' + fakeId).set("Authorization", `Bearer ${token}`).end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.eql(404);
          return done();
        });
      });
    }); //delete query by id

    describe('GET API /api/v1/query/:id', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('query');
      });
      const query = {
        names: "junior",
        email: "arthurjunior88741@gmail.com",
        message: "hey"
      };
      let queryId; // should successfully get query by id

      it('Should get single comment by id', done => {
        _chai.default.request(_app.default).post('/api/v1/inquiry').send(query).end((err, res) => {
          if (err) return done(err);
          queryId = res.body.data._id;

          _chai.default.request(_app.default).delete('/api/v1/inquiry/' + queryId).set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
      it('Should return 404 when query does not exists', done => {
        const fakeId = '1229b52ca50601182da72457';

        _chai.default.request(_app.default).get('/api/v1/inquiry/' + fakeId).set("Authorization", `Bearer ${token}`).end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.eql(404);
          return done();
        });
      });
    });
  });
});