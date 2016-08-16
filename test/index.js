const assert = require('chai').assert;
const axios = require('axios');
const server = require('./testServer');
let currentListeningServer;

describe('Ensure server works', function () {
  before(function () {
    currentListeningServer = server.default.listen(3030);
  });

  after(function () {
    currentListeningServer.close();
  });

  describe('Check basic build', function () {
    it('should return 200', function (done) {
      axios.get('http://localhost:3030/')
      .then((res) => {
        assert.equal(res.status, 200, 'did not return 200', res.status);
        done();
      });
    });

    describe('Check restful routes', function () {

      it('should get all users when presented with the API access token', function (done) {
        axios.get('http://localhost:3030/dev/users', {
          headers: {'x-access-token': process.env.CARVIS_API_KEY || require('../secret/config').CARVIS_API_KEY}
        })
        .then((res) => {
          assert.equal(res.status, 200, 'did not return 200', res.status);
          done();
        });
      });

      let testUserId;

      it('should allow a developer to add a user when presented with the right access token', function (done) {
        axios.post('http://localhost:3030/dev/users', {email: 'testy@gmail.com', password: 'test'}, {
          headers: {'x-access-token': process.env.CARVIS_API_KEY || require('../secret/config').CARVIS_API_KEY}
        })
        .then((res) => {
          testUserId = res.data[0].id;
          assert.equal(res.status, 200, 'did not return 200', res.status);
          done();
        });
      });

      it('should users to update their information', function (done) {
        axios.put(`http://localhost:3030/users/update/${testUserId}`, {email: 'testy@gmail.com', password: 'newtest'}, {
        })
        .then((res) => {
          assert.equal(res.status, 200, 'did not return 200', res.status);
          done();
        });
      });


      it('should delete the user created by the developer', function (done) {
        axios.delete(`http://localhost:3030/dev/users/${testUserId}`, {
          headers: {'x-access-token': process.env.CARVIS_API_KEY || require('../secret/config').CARVIS_API_KEY}
        })
        .then((res) => {
          assert.equal(res.status, 200, 'did not return 200', res.status);
          done();
        });
      });

    });
  });


});
