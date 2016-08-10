var fetch = require('node-fetch');
var uberMethods = require('./uberPrivateMethods');
var baseURL = 'http://cn-sjc1.uber.com'; // https ?

var login = function (username, password) {
  var path = uberMethods.login.path;
  var body = uberMethods.login.body(username, password);
  var headers = uberMethods.login.headers();

  fetch(baseURL + path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // DB post all data --
      var response = uberMethods.login.responseMethod(data);
      // response.email for DB && response.token for subsequent calls.
    })
    .catch(function (err) {
      console.log('ERROR login UBER', err);
    });
};

var requestRide = function (origin) { // origin is the home location
  var path = uberMethods.requestRide.path;
  var body = uberMethods.requestRide.body(origin);
  var headers = uberMethods.requestRide.headers();

  fetch(baseURL + path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // DB post all data.
      var response = uberMethods.requestRide.responseMethod(data);

      var time = Math.random() * 4 + 1; // random time 1-5 seconds.
      setTimeout(function () {
        return confirmPickup(response.priceToken, response.priceId, response.paymentProfile, destination, origin); // TODO: destination
      }, time);

    })
    .catch(function (err) {
      console.log('ERROR login UBER', err);
    });
};

var confirmPickup = function (priceToken, priceId, paymentProfile, destination) {
  var path = uberMethods.confirmPickup.path;
  var body = uberMethods.confirmPickup.body(priceToken, priceId, destination);
  var headers = uberMethods.confirmPickup.headers();

  fetch(baseURL + path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // DB post all data.
      var response = uberMethods.confirmPickup.responseMethod(data);
      // do something client/non-gitignored side with response, cancel methods etc
    })
    .catch(function (err) {
      console.log('ERROR login UBER', err);
    });
};

module.exports = {
  login: login,
  requestRide: requestRide,
  confirmPickup: confirmPickup
};
