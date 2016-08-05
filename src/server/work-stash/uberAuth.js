const uberURL = `https://login.uber.com/oauth/v2/authorize?client_id=${UBER_CLIENT_ID}&response_type=code`;
const uberExchangeURL = `https://login.uber.com/oauth/v2/token?client_secret=YOUR_CLIENT_SECRET`;

// import { PORT } from '../config';
//
// export default new uberStrategy('uber', {
//   clientID: ID,
//   clientSecret: SECRET,
//   callbackURL: `http://127.0.0.1:${PORT}/auth/uber/callback`
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ uberid: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// );
