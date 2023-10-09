// test/user.test.js

const request = require('supertest');
const server = require('../index'); 
const chai = require('chai');
const expect = chai.expect;

describe('User API', () => {
  let userId ="6522f440a51171959ea11572";
  let loanId = "6523931594d5f0e874e97bb8";

  it('should retrieve a user by ID', (done) => {
    request(server)
      .get(`/User/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.user.name).to.equal("avinit");
        done();
      });
  });
  it('should retrieve a loan by ID', (done) => {
    request(server)
      .get(`/loan/${loanId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.loan._id).to.equal("6523931594d5f0e874e97bb8");
        done();
      });
  });
  it('should login a user', (done) => {
    request(server)
      .post(`/User/login`)
      .send({"userName":"sree","password":"avinitkumar123"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Authentication successful");
        done();
      });
  });

});
