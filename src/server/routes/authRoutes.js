var lyftHelper = require('./../utils/lyft-helper.js');
var uberHelper = require('./../utils/uber-helper.js');
import User from '../../db/User';
import isAuthenticated from '../server-configuration/isAuthenticated';

export default function(app, passport) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);
    lyftHelper.lyftPhoneAuth(phoneNumber);
    res.json({message: 'on its way'});
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode);
    lyftHelper.lyftPhoneCodeAuth(lyftCode, phoneNumber);
    // NOTE: need to pass session and userLocation from DB
    res.redirect('/');
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let uberObj = req.body;
    uberHelper.login(uberObj.email, uberObj.password);
    console.log('got uber obj', uberObj);
    res.redirect('/');
  });

  app.post('/auth/signup', passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/' }));

  app.post('/auth/login',
  passport.authenticate('local'), (req, res) => {
    res.json({nextLocation: ''});
  });

  app.get('/auth/checkLogin', isAuthenticated, (req, res) => {
    console.log('user', req.user);
    console.log('req', req);
    // TODO hardcoded dev user id
    res.json({userid: 1, authenticated: true});
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}
