"use strict";

var _app = _interopRequireDefault(require("../../app"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//blog
_chai.default.use(_chaiHttp.default); //sign up


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

    describe('POST API /api/v1/blog', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('blog');
      });
      const blog = {
        image: "image",
        title: "coding",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      };
      it('it should successfully create blog and return 201', done => {
        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.equal(201);
          (0, _chai.expect)(res.body).to.haveOwnProperty('data');
          return done();
        });
      });
      it('Should return 400 when blog exists', done => {
        const oldeblog = blog;

        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (oldeblog) return done(err);
          (0, _chai.expect)(res.status).to.be.eql(400);
          return done();
        });
      });
    });
    describe('GET API /api/v1/blog', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('blog');
      });
      const blog = {
        image: "image",
        title: "coding",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }; // should get list of blogs

      it('Should get the list of blogs', done => {
        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (err) return done(err);

          _chai.default.request(_app.default).get('/api/v1/blog').end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
    }); //get blog by id

    describe('GET API /api/v1/blog/:id', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('blog');
      });
      const blog = {
        image: "image",
        title: "coding",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      };
      let blogId; // should successfully get blog by id

      it('Should get single blog by id', done => {
        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (err) return done(err);
          blogId = res.body.data._id;

          _chai.default.request(_app.default).get('/api/v1/blog/' + blogId).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
      it('Should return 404 when blog does not exists', done => {
        const fakeId = '1229b52ca50601182da72457';

        _chai.default.request(_app.default).get('/api/v1/blog/' + fakeId).end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.eql(404);
          return done();
        });
      });
    }); //delete blog by id

    describe('GET API /api/v1/blog/:id', () => {
      before(() => {
        _mongoose.default.connection.dropCollection('blog');
      });
      const blog = {
        image: "image",
        title: "coding",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      };
      let blogId; // should successfully get blog by id

      it('Should get single blog by id', done => {
        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (err) return done(err);
          blogId = res.body.data._id;

          _chai.default.request(_app.default).delete('/api/v1/blog/' + blogId).set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      }); //update

      it('Should get single blog by id and update it', done => {
        _chai.default.request(_app.default).post('/api/v1/blog').set("Authorization", `Bearer ${token}`).send(blog).end((err, res) => {
          if (err) return done(err);
          blogId = res.body.data._id;

          _chai.default.request(_app.default).put('/api/v1/blog/' + blogId).set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.eql(200);
            return done();
          });
        });
      });
      it('Should return 404 when blog does not exists', done => {
        const fakeId = '1229b52ca50601182da72457';

        _chai.default.request(_app.default).get('/api/v1/blog/' + fakeId).end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.eql(404);
          return done();
        });
      });
    });
  });
});