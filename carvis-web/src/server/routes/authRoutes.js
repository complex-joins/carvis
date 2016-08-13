var lyftHelper = require('./../utils/lyft-helper.js');
var uberHelper = require('./../utils/uber-helper.js');

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/auth/lyftAuth', (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);
    lyftHelper.lyftPhoneAuth(phoneNumber);
    res.json({ message: 'on its way' });
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode);
    lyftHelper.lyftPhoneCodeAuth(lyftCode, phoneNumber);
    // NOTE: need to pass origin / userLocation from DB
    res.json({ message: 'yes!' });
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let uberObj = req.body;
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

  app.post('/request/ride/:vendor', (req, res) => {
    let vendor = req.params.vendor;

    // if the vendor is uber/lyft call the relevant book ride.

    if (vendor === 'uber') {
      // function (userLocation, token, destination)
      uberHelper.confirmPickup({ lat: '37.7773563', lng: '-122.3968629' }, '', { lat: '37.7773563', lng: '-122.3968629' }); // TODO: dynamic
      console.log('requesting uber ride');
      res.json({ message: 'on its way' });

    } else if (vendor === 'lyft') {
      // function (token, origin, destination, paymentInfo, partySize, rideId)
      lyftHelper.getCost('', { lat: '', lng: '', routableAddress: '' }, { lat: '', lng: '', routableAddress: '' }, '', 1, ''); // TODO: dynamic.
      console.log('requesting lyft ride');
      res.json({ message: 'on its way' });

      // if vendor isn't uber/lyft return a 404 not found.
    } else {
      console.log('invalid vendor');
      res.status(404)
        .send();
    }
  });

}
