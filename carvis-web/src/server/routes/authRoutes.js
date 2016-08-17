// var lyftHelper = require('./../utils/lyft-helper.js');
// var uberHelper = require('./../utils/uber-helper.js');

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);

    // TODO: fetch() POST to api helper server '/lyft/phoneauth'
    lyftHelper.lyftPhoneAuth(phoneNumber);
    res.json({ message: 'on its way' });
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode);

    // TODO: fetch() POST to api helper server '/lyft/phoneCodeAuth'
    lyftHelper.lyftPhoneCodeAuth(lyftCode, phoneNumber);
    res.json({ message: 'yes!' });
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let uberObj = req.body;

    // TODO: fetch() POST to api helper server '/uber/login'
    uberHelper.login(uberObj.email, uberObj.password);
    console.log('got uber obj', uberObj);
    res.json({ message: 'on its way' });
  });

  app.post('/auth/signup', (req, res) => {
    // Create user creds, walk thrme through setting up alexa, lyft, etc
  });

  app.post('/auth/login', (req, res) => {
    // Basic auth
  });

}
