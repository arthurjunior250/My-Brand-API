import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//query

chai.use(chaiHttp);

//post query
describe('POST API /api/v1/inquiry', () => {
    before(() => {
        mongoose.connection.dropCollection('query');
    })
    const query = {
            names: "junior",
            email: "arthurjunior88741@gmail.com",
            message: "hey"
        }
        // should successfully create a query
    it('it should successfully create query and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/inquiry')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);
                return done();
            })
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

        // //post blog

        //get blog by id

        //delete blog by id
        // //get query
        describe('GET API /api/v1/query', () => {
            before(() => {
                mongoose.connection.dropCollection('query');
            })
            const query = {
                    names: "junior",
                    email: "arthurjunior88741@gmail.com",
                    message: "hey"
                }
                // should get list of queries
            it('Should get the list of query', (done) => {
                chai.request(app)
                    .post('/api/v1/inquiry')
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)
                        chai.request(app).get('/api/v1/inquiry')
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });
        });
        //get query by id
        describe('GET API /api/v1/query/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('query');
            })
            const query = {
                names: "junior",
                email: "arthurjunior88741@gmail.com",
                message: "hey"
            }
            let queryId;
            // should successfully get query by id
            it('Should get single query by id', (done) => {
                chai.request(app)
                    .post('/api/v1/inquiry')
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)
                        queryId = res.body.data._id;
                        chai.request(app).get('/api/v1/inquiry/' + queryId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    });
                it('Should return 404 ', (done) => {
                    const id = res.body.data._id;
                    chai.request(app).get('/api/v1/inquiry/' + queryId)
                        .set("Authorization", `Bearer ${token}`)
                        .send(query)
                        .end((err, res) => {
                            if (!id) return done(err);
                            expect(res.status).to.be.eql(400)
                            return done();
                        })

                });

            });


            it('Should return 404 when qquery does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/inquiry/' + fakeId)
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            });

        });
        //delete query by id

        describe('GET API /api/v1/query/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('query');
            })
            const query = {
                names: "junior",
                email: "arthurjunior88741@gmail.com",
                message: "hey"
            }
            let queryId;
            // should successfully get query by id
            it('Should get single comment by id', (done) => {
                chai.request(app)
                    .post('/api/v1/inquiry')
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)

                        queryId = res.body.data._id;
                        chai.request(app).delete('/api/v1/inquiry/' + queryId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });

            it('Should return 404 when query does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/inquiry/' + fakeId)
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            });

        });




    });

});