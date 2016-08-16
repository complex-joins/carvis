var fetch = require('node-fetch');
var uberMethods = require('./uberPrivateMethods');
var APItoken = require('./../../../secret/config.js')
  .CARVIS_API_KEY;
var APIserver = require('./../../../secret/config.js')
  .CARVIS_API;
var baseURL = 'https://cn-sjc1.uber.com';

var login = function (username, password, userId) {
  var path = baseURL + uberMethods.login.path;
  var body = uberMethods.login.body(username, password);
  var headers = uberMethods.login.headers();

  userId = userId || null; // alexaUserId

  fetch(path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var response = uberMethods.login.responseMethod(data, password, userId);

      // POST THE USER DATA TO OUR RELATIONAL DATABASE
      // var dbpostURL = 'http://' + APIserver + '/users/updateOrCreate';
      var dbpostURL = 'http://localhost:8080/users/updateOrCreate';

      console.log('response pre DB post', response);

      fetch(dbpostURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': APItoken
          },
          body: JSON.stringify(response)
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log('success posting user', data);
        })
        .catch(function (err) {
          console.warn('err posting user', err);
        });

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
//         return confirmPickup(response.priceToken, response.priceId, response.paymentProfile, destination, origin);
//       }, time);
//
//     })
//     .catch(function (err) {
//       console.log('ERROR login UBER', err);
//     });
// };

var confirmPickup = function (userLocation, token, destination, rideId) {
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

      // var dbpostURL = 'http://' + APIserver + '/rides/' + rideId;
      var dbpostURL = 'http://localhost:8080/rides/' + rideId;

      // once we receive the request-ride confirmation response
      // we update the DB record for that ride with eta and vendorRideId
      fetch(dbpostURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': APItoken
          },
          body: JSON.stringify(response)
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log('success posting user', data);
        })
        .catch(function (err) {
          console.warn('err posting user', err);
        });

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
