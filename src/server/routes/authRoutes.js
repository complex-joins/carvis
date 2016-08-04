import passport from 'passport';
import { UBER_CLIENT_ID } from '../secret/apikeys';
import axios from 'axios';

const uberURL = `https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`;

export default function(app) {
  app.get('/auth/uber', callUberOAuth, (req, res) => {
    res.redirect('/');
  });
  app.get('/auth/uber/callback', (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

}


function callUberOAuth(req, res, next) {
  axios.get(`https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`)
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
}
