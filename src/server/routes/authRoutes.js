import passport from 'passport';
import { UBER_CLIENT_ID } from '../secret/apikeys';

export default function(app) {
  app.get('/uber/callback', (req, res) => {
    res.end(JSON.stringify(req.session.grant.response, null, 2));
  });
}
