const CARVIS_API_KEY = process.env.CARVIS_API_KEY;
const CARVIS_API = process.env.CARVIS_API;
const JWT_SECRET = process.env.JWT_SECRET;
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

export default function (app) { // LYFT 2FA - first call sends SMS to user
  // route middleware to verify a token
  app.use('/auth', function(req, res, next) {
    let jwtToken = req.body.jwtToken || req.query.jwtToken || req.headers['x-access-jwtToken'];

    if (jwtToken) {
      jwt.verify(jwtToken, JWT_SECRET, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate jwtToken'});
        } else {
          req.body.carvisUserId = decoded.id;
          console.log('req.body inside app.use middleware:', req.body);
          next();
        }
      })
    } else {
      next();
    }
  });

  app.post('/auth/lyftAuth', (req, res) => {
    console.log('phone number is ', req.body.phoneNumber);
    let url = 'http://' + CARVIS_API + '/lyft/phoneauth';
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body) // pass through the body.
      })
      .then(res => res.json())
      .then(data => {
        let message = 'success lyft phone number auth';
        console.log(message, data);
        res.json({ message: message });
      })
      .catch(err => console.warn('err lyft phone number auth', err));
  });

  app.post('/auth/lyftCode', (req, res) => { // second call submits that code
    let lyftCode = req.body.lyftCode;
    let phoneNumber = req.body.phoneNumber;
    console.log('got code', lyftCode, 'for number', phoneNumber);

    let url = 'http://' + CARVIS_API + '/lyft/phoneCodeAuth';
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body) // pass through body.
      })
      .then(res => res.json())
      .then(data => {
        let message = 'success lyft phone code auth';
        console.log(message, data);

        // create a token
        let jwtToken = jwt.sign({ id: data.id }, JWT_SECRET, {
          expiresIn: '1 day'
        });

        res.json({ jwtToken: jwtToken, user: data });
      })
      .catch(err => console.warn('err lyft phone code auth', err));
  });

  app.post('/auth/uberAuth', (req, res) => { // user|pw Uber login
    let url = 'http://' + CARVIS_API + '/uber/login';

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY // CARVIS_API_KEY
        },
        body: JSON.stringify(req.body) // pass through body.
      })
      .then(res => res.json())
      .then(data => {
        console.log('success uber login', data);
        // create a token
        let jwtToken = jwt.sign({ id: data.id }, JWT_SECRET, {
          expiresIn: '1 day'
        });
        
        res.json({ jwtToken: jwtToken, user: data });
      })
      .catch(err => console.warn('err uber auth', err));
  });
}
