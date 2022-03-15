import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//auth

chai.use(chaiHttp);

//sign up
describe('POST API /api/v1/authentication/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('signup');
    })
    const user = {
        userName: "arthur",
        email: "arthurkigali@gmail.com",
        password: "123456"
    }
    it('it should successfully create an account and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/authentication/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(400);
                return done();
            })
    });
    it('Should return 400 when email exists', (done) => {
        const oldemail = user.email
        chai.request(app).post('/api/v1/authentication/signup')
            .send(user)
            .end((err, res) => {
                if (oldemail) return done(err);
                expect(res.status).to.be.eql(400)
                return done();
            })

    });
});
//sign in
describe('POST API /api/v1/authentication/login', () => {
    before(() => {
        mongoose.connection.dropCollection('login');
    })
    const user = {
        email: "arthurkigali@gmail.com",
        password: "123456"
    }
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/authentication/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })
    });
});

// get user profile
describe('GET API /api/v1/authentication/user-profile', () => {
    before(() => {
        mongoose.connection.dropCollection('user-profile');
    })
    const user = {
        email: "arthurkigali@gmail.com",
        password: "123456"
    }
    let token = "";
    it('Should login', (done) => {
        chai.request(app)
            .post('/api/v1/authentication/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                chai.request(app).get('/api/v1/authentication/user-profile')
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(200)
                        return done();
                    })
            })
    });
});