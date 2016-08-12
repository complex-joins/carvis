import {User} from '../../db/User';
import {Strategy as LocalStrategy} from 'passport-local';

export default function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then((user) => done(err, user))
    .catch((err) => done(err));
  });

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      console.log('using local strat');
      User.findOrCreate({ username: username, password: password })
      .then((user) => {
        console.log('user in db', user);
        if (!User.isValidPassword(password, user.id)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((err) => {
        console.log('error authenticating', err);
        return done(err);
      });
    }));
}
