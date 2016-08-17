const helperAPItoken = require('./../../../secret/config.js')
  .CARVIS_HELPER_API_KEY;

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);

    fetch('http://localhost:8888/lyft/phoneauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': helperAPItoken
        },
        body: JSON.stringify(req.body) // pass through the body.
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

    fetch('http://localhost:8888/lyft/phoneCodeAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': helperAPItoken
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

    res.json({ message: 'yes!' });
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login

    fetch('http://localhost:8888/uber/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': helperAPItoken
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
