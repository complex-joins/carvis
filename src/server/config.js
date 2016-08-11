import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import User from '../db/User';
import {Strategy as LocalStrategy} from 'passport-local';

export const PORT = process.env.PORT || 8000;

export const configureServer = function(app, passport) {
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.static(path.join(__dirname, '/../../node_modules')));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
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
  }
};
