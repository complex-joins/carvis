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
      // TODO: DB post
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
      // response irrelevant unless we pass through session
      // DB post.
    })
    .catch(function (err) {
      console.log('error post of phoneNumber LYFT', err);
    });
};

// NOTE: userLocation should come from the user client // Alexa.
var lyftPhoneCodeAuth = function (fourDigitCode, phoneNumber, session, userLocation) {

  userLocation = userLocation || null; // pass through userLocation if we have one, otherwise use randomly generated location.

  var url = lyftMethods.phoneCodeAuth.path;
  var headers = lyftMethods.phoneCodeAuth.headers(session);
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
      // TODO: DB POST // responseObject.dbUserProps (email, name etc.)
      var response = lyftMethods.phoneCodeAuth.responseMethod(data);

    })
    .catch(function (err) {
      console.log('error post of phoneCodeAuth LYFT', err);
    });
};
// origin {startLat, startLng, startAddress}
// destination {endLat, endLng, endAddress}
var getCost = function (token, session, origin, destination) {
  var url = baseURL + lyftMethods.getCost.path(origin, destination);
  var headers = lyftMethods.getCost.headers(token, session);

  fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('successful getCost post LYFT', data);

      // TODO: DB POST
      var response = lyftMethods.getCost.responseMethod(data);
      // do something with response.tripDuration ?
      var time = Math.random() * 4 + 1; // random time 1-5 seconds.
      setTimeout(function () {
        return requestRide(token, session, response.costToken, destination, origin, paymentInfo, partySize); // this is the next step, TODO: params.
      }, time);

    })
    .catch(function (err) {
      console.log('error post of getCost LYFT', err);
    });

};

var requestRide = function (token, session, costToken, destination, origin, paymentInfo, partySize) {
  var url = baseURL + lyftMethods.requestRide.path;
  var headers = lyftMethods.requestRide.headers(token, session);
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

      // TODO: DB POST
      var responseObject = lyftMethods.requestRide.responseMethod(data);
      // next step?
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
