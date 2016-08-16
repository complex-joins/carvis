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
  });
});
