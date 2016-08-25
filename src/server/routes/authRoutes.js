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

      // create a token
      let token = jwt.sign({ id: data.id }, 'shdonttell', {
        expiresIn: '1 day'
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
        let message = 'success uber auth';
        console.log(message, data);
                
        // create a token
        let token = jwt.sign({ id: data.id }, 'shdonttell', {
          expiresIn: '1 day'
        });
      
        res.json({ token: token, user: data });
      })
      .catch(function (err) {
        console.warn('err uber auth', err);
      });
  });
}
