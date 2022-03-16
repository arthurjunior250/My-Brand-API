import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//blog

chai.use(chaiHttp);
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
        describe('POST API /api/v1/blog', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                image: "image",
                title: "coding",
                description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            it('it should successfully create blog and return 201', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)

                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.haveOwnProperty('data')
                    return done();
                })
            });
            it('Should return 400 when blog exists', (done) => {
                const oldeblog = blog;
                chai.request(app).post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (oldeblog) return done(err);
                        expect(res.status).to.be.eql(400)
                        return done();
                    })

            });

        });
        describe('GET API /api/v1/blog', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                    image: "image",
                    title: "coding",
                    description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
                // should get list of blogs
            it('Should get the list of blogs', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        chai.request(app).get('/api/v1/blog')
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });
        });
        //get blog by id
        describe('GET API /api/v1/blog/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                image: "image",
                title: "coding",
                description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            let blogId;
            // should successfully get blog by id
            it('Should get single blog by id', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        blogId = res.body.data._id;
                        chai.request(app).get('/api/v1/blog/' + blogId)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });

            it('Should return 404 when blog does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/blog/' + fakeId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            });

        });
        //delete blog by id

        describe('GET API /api/v1/blog/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                image: "image",
                title: "coding",
                description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            let blogId;
            // should successfully get blog by id
            it('Should get single blog by id', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)

                .end((err, res) => {
                    if (err) return done(err)

                    blogId = res.body.data._id;
                    chai.request(app).delete('/api/v1/blog/' + blogId)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
            });
            //update
            it('Should get single blog by id and update it', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)

                .end((err, res) => {
                    if (err) return done(err)

                    blogId = res.body.data._id;
                    chai.request(app).put('/api/v1/blog/' + blogId)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
            });

            it('Should return 404 when blog does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/blog/' + fakeId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            });

        });


    });

});