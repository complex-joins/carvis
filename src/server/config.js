export const PORT = process.env.PORT || 8000;
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Grant from 'grant-express';
import oAuthConfigObj from './auth/oAuthConfig';

export const configureServer = function(app) {
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.static(path.join(__dirname, '/../../node_modules')));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUnitialized: true
  }));
  app.use(new Grant(oAuthConfigObj));

  // app.use(passport.initialize());
  // app.use(passport.session());
};
