import {User} from '../../db/User';
import {Strategy as LocalStrategy} from 'passport-local';

export default function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then((user) => done(err, user))
    .catch((err) => done(err));
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOrCreate({ username: username, password: password })
      .then((user) => {
        if (!User.isValidPassword(password, user.id)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((err) => done(err));
    }));
}
