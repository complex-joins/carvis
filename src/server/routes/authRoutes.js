const CARVIS_API_KEY = process.env.CARVIS_API_KEY;
const CARVIS_API = process.env.CARVIS_API;
import fetch from 'node-fetch';

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let body = req.body;
    console.log('phone number is ', body.phoneNumber);
    let url = 'http://' + CARVIS_API + '/lyft/phoneauth';

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: body // pass through the body.
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

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode);

    let url = CARVIS_API + '/lyft/phoneCodeAuth';

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body) // pass through body.
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log('success lyft phone code auth', data);
      })
      .catch(function (err) {
        console.warn('err lyft phone code auth', err);
      });

    res.json({ message: 'yes!' });
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login

    let url = CARVIS_API + '/uber/login';

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body) // pass through body.
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log('success uber login', data);
      })
      .catch(function (err) {
        console.warn('err uber login', err);
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
