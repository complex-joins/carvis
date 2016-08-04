import passport from 'passport';

export default function(app) {
  app.get('/auth/uber', passport.authenticate('uber'));

  app.get('/auth/uber/callback', passport.authenticate('uber', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

}
