var fetch = require('node-fetch');
var uberMethods = require('./uberPrivateMethods');
var baseURL = 'https://cn-sjc1.uber.com'; // https ?

var login = function (username, password) {
  var path = baseURL + uberMethods.login.path;
  var body = uberMethods.login.body(username, password);
  var headers = uberMethods.login.headers();

  console.log('PATH', path, 'BODY', body, 'HEADERS', headers);

  fetch(path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // DB post all data --
      console.log("SUCCESS UBER LOGIN-----", data);
      var response = uberMethods.login.responseMethod(data);
      // response.email for DB && response.token for subsequent calls.
    })
    .catch(function (err) {
      console.log('ERROR login UBER', err);
    });
};

// var requestRide = function (origin) { // origin is the home location
//   var path = baseURL + uberMethods.requestRide.path;
//   var body = uberMethods.requestRide.body(origin);
//   var headers = uberMethods.requestRide.headers();
//
//   fetch(path, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(body)
//     })
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       // DB post all data.
//       var response = uberMethods.requestRide.responseMethod(data);
//
//       var time = Math.random() * 4 + 1; // random time 1-5 seconds.
//       setTimeout(function () {
//         return confirmPickup(response.priceToken, response.priceId, response.paymentProfile, destination, origin); // TODO: destination
//       }, time);
//
//     })
//     .catch(function (err) {
//       console.log('ERROR login UBER', err);
//     });
// };

var confirmPickup = function (userLocation, token, destination) {
  var path = baseURL + uberMethods.confirmPickup.path;
  var body = uberMethods.confirmPickup.body(destination, userLocation);
  var headers = uberMethods.confirmPickup.headers(userLocation, token);

  fetch(path, {
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
  // requestRide: requestRide,
  confirmPickup: confirmPickup
};
