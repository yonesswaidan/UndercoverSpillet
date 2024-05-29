const { expect } = require('chai');
const request = require('supertest');
const app = require('../../server'); 

describe('POST /api/users', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({ playerName: 'Test User' })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.user).to.have.property('_id');
        expect(res.body.user).to.have.property('playerName', 'Test User');
        done();
      });
  });
});
