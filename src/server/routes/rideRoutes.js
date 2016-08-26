const CARVIS_API_KEY = process.env.CARVIS_API_KEY;
const CARVIS_API = process.env.CARVIS_API;
const JWT_SECRET = process.env.JWT_SECRET;
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

export default function (app) { // LYFT 2FA - first call sends SMS to user
  app.post('/internal/getEstimate', (req, res) => {
    // do the userId decryption

    let url = `http://localhost:8080/web/estimate`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': process.env.CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        console.log('success POST getEstimate to API', data);
        let sanitizeResponse = (data) => {
          let response = {
            lyftEstimatedFare: data.lyftEstimatedFare,
            uberEstimatedFare: data.uberEstimatedFare,
            lyftEstimatedETA: data.lyftEstimatedETA,
            uberEstimatedETA: data.uberEstimatedETA
          };
          return response;
        }
        let response = sanitizeResponse(data);

        res.json(response);
      })
      .then(err => console.warn('error POST getEstimate to API', err));
  });

  app.post('/internal/addRide', (req, res) => {
    // do the userId decryption

    let url = `http://localhost:8080/web/addRide`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': process.env.CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        console.log('success POST addRide to API', data);
        // NOTE: in future shield sensitive info from client.
        // similar to lyftPrivateMethods logic.
        res.json(data);
      })
      .then(err => console.warn('error POST addRide to API', err));
  });


  app.post('/internal/requestRide', (req, res) => {
    // do the userId decryption

    let url = `http://localhost:8080/web/requestRide`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': process.env.CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        console.log('success POST requestRide to API', data);
        // NOTE: in future shield sensitive info from client.
        // similar to lyftPrivateMethods logic.
        res.json(data);
      })
      .then(err => console.warn('error POST requestRide to API', err));
  });

  app.post('/internal/shareETA', (req, res) => {
    // do the userId decryption

    let url = `http://localhost:8080/web/shareETA`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': process.env.CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        console.log('success POST shareETA to API', data);
        // NOTE: in future shield sensitive info from client.
        // similar to lyftPrivateMethods logic.
        res.json(data);
      })
      .then(err => console.warn('error POST shareETA to API', err));
  });

}
