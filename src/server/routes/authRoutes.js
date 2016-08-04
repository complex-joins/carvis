import passport from 'passport';
import { UBER_CLIENT_ID } from '../secret/apikeys';
import axios from 'axios';

const uberURL = `https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`;
const uberExchangeURL = `https://login.uber.com/oauth/v2/token?client_secret=YOUR_CLIENT_SECRET`;

export default function(app) {
  app.get('/auth/uber', (req, res) => {
    res.redirect(uberURL);
  });
  app.get('/auth/uber/callback', (req, res) => {
    // Successful authentication, redirect home.
    let code = req.parsedQuery.code;
    console.log('it works!!!', req.parsedQuery.code);
    res.redirect(`https://login.uber.com/oauth/v2/token?client_secret=${code}`);
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
