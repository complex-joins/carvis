var fetch = require('node-fetch');
var btoa = require('btoa');
var lyftMethods = require('./lyftPrivateMethods');
var auth = require('./../../../secret/config.js')
  .LYFT_USER_ID;
var APItoken = require('./../../../secret/config.js')
  .CARVIS_API_KEY;
var APIserver = require('./../../../secret/config.js')
  .CARVIS_API;
var baseURL = 'https://api.lyft.com/v1/'; // on which path is added.

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

var lyftPhoneCodeAuth = function (fourDigitCode, phoneNumber, userLocation, userId) {

  userId = userId || null; // alexaUserId
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
      // console.log('successful phoneCodeAuth post LYFT', data);

      // the responseMethod function returns an object with the parameters we need for subsequent operations only, and in a key-name generalised manner.
      var response = lyftMethods.phoneCodeAuth.responseMethod(data, userId);

      // POST THE USER DATA TO OUR RELATIONAL DATABASE
      // var dbpostURL = 'http://' + APIserver + '/users/updateOrCreate';
      var dbpostURL = 'http://localhost:8080/users/updateOrCreate';

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
      console.log('error post of phoneCodeAuth LYFT', err);
    });
};

var getCost = function (token, origin, destination, paymentInfo, partySize, rideId) {
  var url = lyftMethods.getCost.path(origin, destination);
  var headers = lyftMethods.getCost.headers(token);

  fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful getCost LYFT', data);
      var response = lyftMethods.getCost.responseMethod(data);

      // random time 1-5 seconds - to simulate more 'natural' patterns
      var time = Math.random() * 4 + 1;
      setTimeout(function () {
        return requestRide(token, response.costToken, destination, origin, paymentInfo, partySize, rideId, response.tripDuration);
      }, time);
    })
    .catch(function (err) {
      console.log('error getCost LYFT', err);
    });

};

var requestRide = function (token, costToken, destination, origin, paymentInfo, partySize, rideId, tripDuration) {
  var url = lyftMethods.requestRide.path;
  var headers = lyftMethods.requestRide.headers(token);
  var body = lyftMethods.requestRide.body(costToken, destination, origin, paymentInfo, partySize);

  console.log('costToken pre requestRide', costToken);
  console.log('body pre requestRide', body);

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
      var response = lyftMethods.requestRide.responseMethod(data, tripDuration);

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
