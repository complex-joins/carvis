var fetch = require('node-fetch');
var btoa = require('btoa');
var lyftMethods = require('./lyftPrivateMethods');
var auth = require('./../../../secret/config.js')
  .LYFT_USER_ID;
var baseURL = 'https://api.lyft.com/v1/'; // on which path is added.

// TODO: database posts in each response -- with generic key naming.

var refreshBearerToken = function () {
  var url = 'https://api.lyft.com/oauth/token';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(auth)
  };
  var body = {
    'grant_type': 'client_credentials',
    'scope': 'public offline'
  };

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var lyftBearerToken = data.token_type + ' ' + data.access_token;
      var expiration = data.expires_in; // 86400 seconds || 1 day.
    })
    .catch(function (err) {
      console.log('LYFT Bearer token error', err);
    });
};

var lyftPhoneAuth = function (phoneNumberString) {
  var url = lyftMethods.phoneAuth.path;
  var headers = lyftMethods.phoneAuth.headers();
  var body = lyftMethods.phoneAuth.body(phoneNumberString);

  console.log('lyftPhoneAuth number', phoneNumberString, 'body', body, 'headers', headers, 'url', url);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful phoneNumber post LYFT', data);
    })
    .catch(function (err) {
      console.log('error post of phoneNumber LYFT', err);
    });
};

// NOTE: userLocation should come from the user client // Alexa.
var lyftPhoneCodeAuth = function (fourDigitCode, phoneNumber, userLocation, userId) {

  userLocation = userLocation || null;

  var url = lyftMethods.phoneCodeAuth.path;
  var headers = lyftMethods.phoneCodeAuth.headers();
  var body = lyftMethods.phoneCodeAuth.body(fourDigitCode, phoneNumber, userLocation);

  console.log('lyftPhoneCodeAuth number', fourDigitCode, phoneNumber, 'body', body, 'headers', headers, 'url', url);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful phoneCodeAuth post LYFT', data);

      // the responseMethod function returns an object with the parameters we need for subsequent operations only, and in a key-name generalised manner.
      var response = lyftMethods.phoneCodeAuth.responseMethod(data, userId);

      // TODO: refactor to createOrUpdate DB call.
      var dbpostURL = '/users/update/:' + userId; // update user call for now

      // POST THE USER DATA TO OUR RELATIONAL DATABASE
      fetch(dbpostURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
      console.log('error post of phoneCodeAuth LYFT', err);
    });
};
// origin {startLat, startLng, startAddress}
// destination {endLat, endLng, endAddress}
var getCost = function (token, origin, destination, paymentInfo, partySize, rideId) {
  var url = baseURL + lyftMethods.getCost.path(origin, destination);
  var headers = lyftMethods.getCost.headers(token);

  fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful getCost post LYFT', data);

      var response = lyftMethods.getCost.responseMethod(data);
      // NOTE: alexa could speak response.tripDuration

      var time = Math.random() * 4 + 1; // random time 1-5 seconds.
      setTimeout(function () {
        // NOTE: API server needs to pass these parameters to the function.
        // token, paymentInfo come from DB, userId from Alexa, ...
        return requestRide(token, response.costToken, destination, origin, paymentInfo, partySize, rideId);
      }, time);

    })
    .catch(function (err) {
      console.log('error post of getCost LYFT', err);
    });

};

var requestRide = function (token, costToken, destination, origin, paymentInfo, partySize, rideId) {
  var url = baseURL + lyftMethods.requestRide.path;
  var headers = lyftMethods.requestRide.headers(token, );
  var body = lyftMethods.requestRide.body(costToken, destination, origin, paymentInfo, partySize);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful requestRide post LYFT', data);

      var response = lyftMethods.requestRide.responseMethod(data, userId);

      // update ride call by rideId
      var dbpostURL = '';

      /* response includes:
      rideId: rideId, // our unique record ID in the database.
      lyftRideStatus: // status of the ride.
      lyftRideId: // unique identifier, used for cancel etc.
      lyftRideType: // ie. LINE etc.
      eta: // time to arrival - can be communicated to user.
      */

      fetch(dbpostURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
      console.log('error post of requestRide LYFT', err);
    });
};

module.exports = {
  refreshBearerToken: refreshBearerToken,
  lyftPhoneAuth: lyftPhoneAuth,
  lyftPhoneCodeAuth: lyftPhoneCodeAuth,
  getCost: getCost,
  requestRide: requestRide
};
