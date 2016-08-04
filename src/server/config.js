export const PORT = process.env.PORT || 8000;
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Grant from 'grant-express';
import oAuthConfigObj from './auth/oAuthConfig';
import expressQSParser from 'express-qs-parser';

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
    saveUninitialized: true
  }));
  // app.use(new Grant(oAuthConfigObj));
  const qsParserMiddleware = expressQSParser({
      // list of parameters to be analyzed
    params: {
        //applies the pattern on all matched elements thanks to the global option
      filters: /([\w-_]+)(\>|<|\=|\!=)([\w_-]+)/g,
      order: /(-?)([\w\s]+)/
    },
    // name of the request property where the middleware will store the parsed parameters
    storage: 'parsedQuery'
  });

  app.use(qsParserMiddleware);

  // app.use(passport.initialize());
  // app.use(passport.session());
};
