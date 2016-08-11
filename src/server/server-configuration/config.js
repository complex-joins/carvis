import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passportConfig from './passport-config';

export const PORT = process.env.PORT || 8000;

export const configureServer = function(app, passport) {
  app.use(express.static(path.join(__dirname, '/../../client')));
  app.use(express.static(path.join(__dirname, '/../../../node_modules')));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  passportConfig(app, passport);
};
