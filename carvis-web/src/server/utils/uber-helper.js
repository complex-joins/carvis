import fetch from 'node-fetch';
import { login, confirmPickup } from './../utils/uberPrivateMethods.js';
const baseURL = 'https://cn-sjc1.uber.com';
const APItoken = !process.env.PROD ? require('./../../../secret/config.js')
  .CARVIS_API_KEY : process.env.CARVIS_API_KEY;
const APIserver = !process.env.PROD ? require('../../../secret/config.js')
  .CARVIS_API : process.env.CARVIS_API;

export const uberLogin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userId = req.body.userId || null; // alexaUserId

  let path = baseURL + login.path;
  let body = login.body(username, password);
  let headers = login.headers();

  fetch(path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let response = login.responseMethod(data, password, userId);

      // POST THE USER DATA TO OUR RELATIONAL DATABASE
      let dbpostURL = 'http://' + APIserver + '/users/updateOrCreate';
      //let dbpostURL = 'http://localhost:8080/users/updateOrCreate';

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
      console.log('ERROR login UBER', err);
    });
};

// var requestRide = function (origin) { // origin is the home location
//   var path = baseURL + requestRide.path;
//   var body = requestRide.body(origin);
//   var headers = requestRide.headers();
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
//       var response = requestRide.responseMethod(data);
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

export const uberConfirmPickup = (req, res) => {

  let origin = req.body.origin;
  let token = req.body.token;
  let destination = req.body.destination;
  let rideId = req.body.rideId;

  let path = baseURL + confirmPickup.path;
  let body = confirmPickup.body(destination, origin);
  let headers = confirmPickup.headers(origin, token);

  fetch(path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('uber confirmPickup data', data);
      let response = confirmPickup.responseMethod(data);
      let dbpostURL = 'http://' + APIserver + '/rides/' + rideId;
      //let dbpostURL = 'http://localhost:8080/rides/' + rideId;

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
          console.log('success posting user', data);
        })
        .catch(err => {
          console.warn('err posting user', err);
        });

    })
    .catch(err => {
      console.log('ERROR pickup UBER', err);
    });
};
