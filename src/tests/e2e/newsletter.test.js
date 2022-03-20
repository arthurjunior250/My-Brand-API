import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//newsletter

chai.use(chaiHttp);

//subscribe
describe('POST API /api/v1/newsletter/', () => {
    before(() => {
        mongoose.connection.dropCollection('newsletter');
    })
    const newsletter = {
            email: "arthurrrwandafddN@gmail.com"
        }
        // subscribe
    it('should subscribe and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/newsletter/')
            .send(newsletter)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(400);
                return done();
            })
    });

    it("Should return 400 when email exists", (done) => {
        const oldMail = newsletter.email;
        chai
            .request(app)
            .post("/api/v1/newsletter/")
            .send(newsletter)
            .end((err, res) => {
                if (oldMail) return done(err);
                expect(res.status).to.be.equal(400);
                return done();
            });
    });

});


//sign up
describe('POST API /api/v1/authentication/signup', () => {
    before(() => {
        mongoose.connection.dropCollection("users");
    });
    const user = {
        userName: "kigali",
        email: "arthurkigali88@gmail.com",
        role: "admin",
        password: "password",
    };
    it("It should successfully create an account and return 201", (done) => {
        chai
            .request(app)
            .post("/api/v1/authentication/signup")
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(201);
                return done();
            });
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

    //sign in
    describe('POST API /api/v1/authentication/login', () => {
        before(() => {
            mongoose.connection.dropCollection('login');
        })
        const user = {
            email: "arthurkigali88@gmail.com",
            password: "password"
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


        describe('GET API /api/v1/newsletter', () => {
            before(() => {
                mongoose.connection.dropCollection('newsletter');
            })
            const newsletter = {
                    email: "arthurrrrrwandafddN@gmail.com"
                }
                // should get list of email
            it('Should get the list of blogs', (done) => {
                chai.request(app)
                    .post('/api/v1/newsletter')
                    .send(newsletter)
                    .end((err, res) => {
                        if (err) return done(err)
                        chai.request(app).get('/api/v1/newsletter')
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });
            it('Should return 400 when email does not found', (done) => {
                const l = newsletter.email
                chai.request(app).post('/api/v1/newsletter')
                    .send(newsletter)
                    .end((err, res) => {
                        if (!l) return done(err);
                        expect(res.status).to.be.eql(400)
                        return done();
                    })

            });
        });

        describe('GET API /api/v1/newsletter/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('newsletter');
            })
            const newsletter = {
                email: "arthurrrrrwafndafddN@gmail.com"
            }
            let newsletterId;
            // should successfully get email by id
            it('Should get single email by id', (done) => {
                chai.request(app)
                    .post('/api/v1/newsletter')
                    .send(newsletter)

                .end((err, res) => {
                    if (err) return done(err)

                    newsletterId = res.body.data._id;
                    chai.request(app).delete('/api/v1/newsletter/' + newsletterId)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
                it('Should return 400 when email does not found', (done) => {
                    const l = res.body.data._id;
                    chai.request(app).post('/api/v1/newsletter')
                        .send(newsletter)
                        .end((err, res) => {
                            if (!l) return done(err);
                            expect(res.status).to.be.eql(400)
                            return done();
                        })

                });
            });
        });





    });

});