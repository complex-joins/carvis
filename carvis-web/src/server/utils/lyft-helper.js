import fetch from 'node-fetch';
import btoa from 'btoa';
import { phoneAuth, phoneCodeAuth, getCost, requestRide, shareETA, cancelRide } from './../utils/lyftPrivateMethods';
const auth = require('./../../../secret/config.js')
  .LYFT_USER_ID;
const APItoken = require('./../../../secret/config.js')
  .CARVIS_API_KEY;
const APIserver = require('./../../../secret/config.js')
  .CARVIS_API;
const baseURL = 'https://api.lyft.com/v1/';

export const lyftRefreshBearerToken = (req, res) => {
  let url = 'https://api.lyft.com/oauth/token';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(auth)
  };
  let body = {
    'grant_type': 'client_credentials',
    'scope': 'public offline'
  };

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let lyftBearerToken = data.token_type + ' ' + data.access_token;
      let expiration = data.expires_in; // 86400 seconds || 1 day.
    })
    .catch(err => {
      console.log('LYFT Bearer token error', err);
    });
};

export const lyftPhoneAuth = (req, res) => {
  let phoneNumberString = req.body.phoneNumberString;

  let url = phoneAuth.path;
  let headers = phoneAuth.headers();
  let body = phoneAuth.body(phoneNumberString);

  console.log('lyftPhoneAuth number', phoneNumberString, 'body', body, 'headers', headers, 'url', url);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('successful phoneNumber post LYFT', data);
    })
    .catch(err => {
      console.log('error post of phoneNumber LYFT', err);
    });
};

export const lyftPhoneCodeAuth = (req, res) => {
  let fourDigitCode = req.body.fourDigitCode;
  let phoneNumber = req.body.phoneNumber;
  let userLocation = req.body.userLocation || null;
  let userId = req.body.userId || null; // alexaUserId

  let url = phoneCodeAuth.path;
  let headers = phoneCodeAuth.headers();
  let body = phoneCodeAuth.body(fourDigitCode, phoneNumber, userLocation);

  console.log('lyftPhoneCodeAuth number', fourDigitCode, phoneNumber, 'body', body, 'headers', headers, 'url', url);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      // the responseMethod function returns an object with the parameters we need for subsequent operations only, and in a key-name generalised manner.
      let response = phoneCodeAuth.responseMethod(data, userId);

      // POST THE USER DATA TO OUR RELATIONAL DATABASE
      // let dbpostURL = 'http://' + APIserver + '/users/updateOrCreate';
      let dbpostURL = 'http://localhost:8080/users/updateOrCreate';

      fetch(dbpostURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': APItoken
          },
          body: JSON.stringify(response)
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('success posting user', data);
        })
        .catch(err => {
          console.warn('err posting user', err);
        });

    })
    .catch(err => {
      console.log('error post of phoneCodeAuth LYFT', err);
    });
};

export const lyftGetCost = (req, res) => {
  let token = req.body.token;
  let origin = req.body.origin;
  let destination = req.body.destination;
  let paymentInfo = req.body.paymentInfo;
  let partySize = req.body.partySize || 1;
  let rideId = req.body.rideId;

  let url = getCost.path(origin, destination);
  let headers = getCost.headers(token);

  fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('successful getCost LYFT', data);
      let response = getCost.responseMethod(data);

      // random time 1-5 seconds - to simulate more 'natural' patterns
      let time = Math.random() * 4 + 1;
      setTimeout(() => {
        return requestRide(token, response.costToken, destination, origin, paymentInfo, partySize, rideId, response.tripDuration);
      }, time);
    })
    .catch(err => {
      console.log('error getCost LYFT', err);
    });

};

export const lyftRequestRide = (req, res) => {
  let token = req.body.token;
  let costToken = req.body.costToken;
  let destination = req.body.destination;
  let origin = req.body.origin;
  let paymentInfo = req.body.paymentInfo;
  let partySize = req.body.partySize || 1;
  let rideId = req.body.rideId;
  let tripDuration = req.body.tripDuration;

  let url = requestRide.path;
  let headers = requestRide.headers(token);
  let body = requestRide.body(costToken, destination, origin, paymentInfo, partySize);

  console.log('costToken pre requestRide', costToken);
  console.log('body pre requestRide', body);

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('successful requestRide post LYFT', data);
      let response = requestRide.responseMethod(data, tripDuration);

      // let dbpostURL = 'http://' + APIserver + '/rides/' + rideId;
      let dbpostURL = 'http://localhost:8080/rides/' + rideId;

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
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('success updating ride', data);
        })
        .catch(err => {
          console.warn('err updating ride', err);
        });

    })
    .catch(err => {
      console.log('error post of requestRide LYFT', err);
    });
};

export const lyftCancelRide = (req, res) => {
  let token = req.body.token;
  let rideId = req.body.rideId;
  let userLocation = req.body.userLocation;

  let url = cancelRide.path(rideId);
  let headers = cancelRide.headers(token);
  let body = cancelRide.body(userLocation);

  fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('successful cancelRide PUT LYFT', data);
      let response = cancelRide.responseMethod(data);

      // let dbpostURL = 'http://' + APIserver + '/rides/' + rideId;
      let dbpostURL = 'http://localhost:8080/rides/' + rideId;

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
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('success updating ride', data);
        })
        .catch(err => {
          console.warn('err updating ride', err);
        });

    })
    .catch(err => {
      console.log('error PUT of cancelRide LYFT', err);
    });
};

// NOTE: this only returns a URL -- sharing of URL should be done on response
// we could use our twilio integration for this.
export const lyftShareETA = (req, res) => {
  let rideId = req.body.rideId;

  let url = shareETA.path;
  let headers = shareETA.headers(token);
  let body = shareETA.body(rideId);

  fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let response = shareETA.responseMethod(data);
      // TODO: do something with data
      console.log('response shareETA LYFT', response);
    })
    .catch(err => {
      console.warn('error shareETA LYFT', err);
    });
};
