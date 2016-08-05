import passport from 'passport';

export default function(app) {
  app.get('/uber/callback', (req, res) => {
    res.end(JSON.stringify(req.session.grant.response, null, 2));
  });
  app.get('/lyft/callback', (req, res) => {
    res.end(JSON.stringify(req.session.grant.response, null, 2));
  });
}
