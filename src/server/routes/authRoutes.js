const CARVIS_HELPER_API_KEY = process.env.CARVIS_HELPER_API_KEY;
const CARVIS_HELPER_API = process.env.CARVIS_HELPER_API;
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);

    let helperURL = CARVIS_HELPER_API + '/lyft/phoneauth';

    fetch(helperURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_HELPER_API_KEY
        },
        body: JSON.stringify(req.body) // pass through the body.
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let message = 'success lyft phone number auth';
        console.log(message, data);
        res.json({ message: message });
      })
      .catch(function (err) {
        console.warn('err lyft phone number auth', err);
      });
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode);

    let helperURL = CARVIS_HELPER_API + '/lyft/phoneCodeAuth';

    fetch(helperURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': CARVIS_HELPER_API_KEY
      },
      body: JSON.stringify(req.body) // pass through body.
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let message = 'success lyft phone code auth';
      console.log(message, data);
      
      // TODOs: 
        // grab secret from env var
        // change expiresIn to '1 day'

      // create a token
      let token = jwt.sign({ id: data.id, email: data.email }, 'shdonttell', {
        expiresIn: 300
      });

      res.json({ token: token, user: data });
    })
    .catch(function (err) {
      console.warn('err lyft phone code auth', err);
    });
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let helperURL = CARVIS_HELPER_API + '/uber/login';

    fetch(helperURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_HELPER_API_KEY
        },
        body: JSON.stringify(req.body) // pass through body.
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log('success lyft phone auth', data);
      })
      .catch(function (err) {
        console.warn('err lyft phone auth', err);
      });

    res.json({ message: 'on its way' });
  });

  app.post('/auth/signup', (req, res) => {
    // Create user creds, walk thrme through setting up alexa, lyft, etc
  });

  app.post('/auth/login', (req, res) => {
    // Basic auth
  });

}
