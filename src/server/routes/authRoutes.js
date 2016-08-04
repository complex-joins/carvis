import passport from 'passport';
import { UBER_CLIENT_ID } from '../secret/apikeys';
import axios from 'axios';

const uberURL = `https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`;
const uberExchangeURL = `https://login.uber.com/oauth/v2/token?client_secret=YOUR_CLIENT_SECRET`
    // -F 'client_id=YOUR_CLIENT_ID' \
    // -F 'grant_type=authorization_code' \
    // -F 'redirect_uri=YOUR_REDIRECT_URI' \
    // -F 'code=AUTHORIZATION_CODE_FROM_STEP_2'

// var request = require('request')
// var purest = require('purest')({request})
// var config = require('@purest/config')
// var facebook = purest({provider: 'uber', config})
//
// facebook
//   .get('me')
//   .auth('[ACCESS_TOKEN]')
//   .request(function (err, res, body) {
//     // here body is a parsed JSON object containing
//     // id, first_name, last_name, gender, username, ...
//   })



export default function(app) {
  app.get('/auth/uber', (req, res) => {
    res.redirect(uberURL);
  });
  app.get('/auth/uber/callback', (req, res) => {
    // Successful authentication, redirect home.
    console.log('it works!!!', req);
    res.redirect('/');
  });

}


function callUberOAuth(req, res, next) {
  console.log('hit auth middleware');
  axios.get()
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
}

' \
