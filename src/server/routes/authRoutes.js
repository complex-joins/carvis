var lyftHelper = require('./../utils/lyft-helper.js');
var uberHelper = require('./../utils/uber-helper.js');

export default function(app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);
    lyftHelper.lyftPhoneAuth(phoneNumber);
    // NOTE: need to check formatting of number, what does lyft accept.
    res.json({message: 'on its way'});
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    console.log('got code', lyftCode);
    lyftHelper.lyftPhoneCodeAuth(lyftCode, '4242179767');
    // NOTE: need to pass phoneNumber, session and userLocation from DB
    res.json({message: 'yes!'});
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let uberObj = req.body;
    uberHelper.login(uberObj.email, uberObj.password);
    console.log('got uber obj', uberObj);
    res.json({message: 'on its way'});
  });

  app.post('/auth/signup', (req, res) => {
    // Create user creds, walk thrme through setting up alexa, lyft, etc
  });

  app.post('/auth/login', (req, res) => {
    // Basic auth
  });
}
