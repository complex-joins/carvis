import User from '../db/User';
import {Strategy as LocalStrategy} from 'passport-local';
export default function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.find({ username: username }, function (err, user) {
        if (err) { return done(err); }
        console.log('returned user, user');
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!User.isValidPassword(password, user.id)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }));
}
