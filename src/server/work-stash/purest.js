// import passport from 'passport';
// import { UBER_CLIENT_ID } from '../secret/apikeys';
// import axios from 'axios';
//
// const uberURL = `https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`;
// const uberExchangeURL = `https://login.uber.com/oauth/v2/token?client_secret=YOUR_CLIENT_SECRET`;
//
// var request = require('request')
// var purest = require('purest')({request})
// var config = require('@purest/providers')
// var uber = purest({provider: 'uber', config})
//
//

//
// export default function(app) {
//   console.log('uber config from purest', uber);
//   app.get('/uber/callback', (req, res) => {
//     let uberAccessToken = req.session.grant.response.access_token;
//     console.log(uberAccessToken);
//     let uberAuth = uber.get('me').auth(`[${uberAccessToken}]`);
//     console.log('uber auth', uberAuth);
//     uberAuth.request(function (err, res, body) {
//       console.log(res);
//       console.log(body);
//       console.log('err', err);
//       // here body is a parsed JSON object containing
//       // id, first_name, last_name, gender, username, ...
//       // res.end(JSON.stringify(req.session.grant.response, null, 2));
//     });
//   });
//
// }
