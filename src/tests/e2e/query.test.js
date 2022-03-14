import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

chai.use(chaiHttp);
describe('POST API /api/v1/inquiry', () => {
    before(() => {
        mongoose.connection.dropCollection('inquiry');
    })
    const query = {
            "names": "junior",
            "email": "arthurjunior88741@gmail.com",
            "message": "hey"
        }
        // should successfully create a task
    it('it will create a query and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/inquiry')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);

                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    });
});