import {} from './../src/client/order-components/GoogleAPI';
import {} from './../src/server/routes/rideRoutes'; // TODO: modularize... can't test anything effectively right now except by copying in code.

const assert = require('chai')
  .assert;
const axios = require('axios');
const server = require('./testServer');
let currentListeningServer;

describe('Ensure server works', () => {
  before(() => {
    currentListeningServer = server.default.listen(3030);
  });

  after(() => {
    currentListeningServer.close();
  });

  describe('Check basic build', () => {
    it('should return 200', done => {
      axios.get('http://localhost:3030/')
        .then(res => {
          assert.equal(res.status, 200, 'did not return 200', res.status);
          done();
        });
    });
    // it...
  });
  describe('Order ride & Map tests', () => {
    it('should return both Lyft and Uber estimates', done => {
      let body = {
        requestType: 'cheap',
        origin: origin,
        destination: destination,
        carvisUserId: userId
      };
      // TODO:

      done();
    });

    // add tests for other functionalities of local server.

  });

  // describe...
});
