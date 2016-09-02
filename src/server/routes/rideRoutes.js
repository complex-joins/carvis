const CARVIS_API_KEY = process.env.CARVIS_API_KEY;
const CARVIS_API = process.env.CARVIS_API;
const JWT_SECRET = process.env.JWT_SECRET;
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

export default app => { // LYFT 2FA - first call sends SMS to user
  app.post('/internal/getEstimate', (req, res) => {
    // do the userId decryption

    let url = `http://${CARVIS_API}/web/estimate`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        let sanitizeResponse = data => {
          let response = {
            lyftEstimatedFare: data.lyftEstimatedFare,
            uberEstimatedFare: data.uberEstimatedFare,
            lyftEstimatedETA: data.lyftEstimatedETA,
            uberEstimatedETA: data.uberEstimatedETA,
            id: data.id,
            originLat: Number(data.originLat),
            originLng: Number(data.originLng),
            originRoutableAddress: data.originRoutableAddress,
            destinationLat: Number(data.destinationLat),
            destinationLng: Number(data.destinationLng),
            destinationRoutableAddress: data.destinationRoutableAddress,
            winner: data.winner,
            loser: data.loser
          };
          return response;
        }
        let response = sanitizeResponse(data);
        res.json(response);
      })
      .catch(err => console.warn('error POST getEstimate to API', err));
  });

  app.post('/internal/requestRide', (req, res) => {
    // do the userId decryption
    let url = `http://${CARVIS_API}/web/requestRide`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        // NOTE: in future shield sensitive info from client.
        // similar to lyftPrivateMethods logic.
        res.json(data);
      })
      .catch(err => console.warn('error POST requestRide to API', err));
  });

  app.post('/internal/shareETA', (req, res) => {
    // do the userId decryption
    let url = `http://${CARVIS_API}/web/shareETA`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': CARVIS_API_KEY
        },
        body: JSON.stringify(req.body)
      })
      .then(res => res.json())
      .then(data => {
        // NOTE: in future shield sensitive info from client.
        // similar to lyftPrivateMethods logic.
        res.json(data);
      })
      .catch(err => console.warn('error POST shareETA to API', err));
  });

}
