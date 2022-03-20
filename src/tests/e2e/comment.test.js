import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//comment

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
    const user1 = {
        userName: "arthur",
        email: "arthurkigali12@gmail.com",
        password: "123456"
    }
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
    it("It should successfully create an account and return 201", (done) => {
        chai
            .request(app)
            .post("/api/v1/authentication/signup")
            .send(user1)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(201);
                return done();
            });
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
        const user1 = {
            email: "arthurkigali12@gmail.com",
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
        let token1 = "";
        it('it should successfully login and return 200', (done) => {
            chai.request(app)
                .post('/api/v1/authentication/login')
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err)
                    token1 = res.body.token;
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.property("token");
                    return done();
                })
        });



        //create comment by id
        describe('POST API /api/v1/blog/:blogId/comment', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                image: "image",
                title: "coding",
                description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of typehhh and scrambled it to make a type specimen book. It has survived not only five centuries, bjjjut also the leap into electronic typesetting, remaining essentially unchanged. It was populahhrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            };
            const comment = {
                comment: "GOOD JOB"
            }
            let blogId;
            // should successfully get blog by id and comment on it
            it('Should get single blog by id and comment on it', (done) => {
                chai.request(app)
                    .post('/api/v1/blog')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        blogId = res.body.data._id;
                        chai.request(app).post('/api/v1/blog/' + blogId + '/comment')
                            .set("Authorization", `Bearer ${token1}`)
                            .send(comment)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(201)
                                return done();
                            })
                    })
            });
            // it('Should get single blog by id and delete it', (done) => {

            //     chai.request(app).delete('/api/v1/comment/' + blogId)
            //         .end((err, res) => {
            //             if (err) return done(err);
            //             expect(res.status).to.be.eql(201)
            //             return done();
            //         })
            // });
            // it('Should get comment of specified blog', (done) => {

            //     chai.request(app).get('/api/v1/comment/' + blogId)
            //         .end((err, res) => {
            //             if (err) return done(err);
            //             expect(res.status).to.be.eql(200)
            //             return done();
            //         })
            // });

        });



    });


});