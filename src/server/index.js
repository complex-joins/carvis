import express from 'express';
import { PORT, configureServer } from './server-configuration/config';
import authRoutes from './routes/authRoutes';
import staticFileRoutes from './routes/staticFileRoutes';
import passport from 'passport';

const app = express();
// Sessions, passport, auth middleware
configureServer(app, passport);
// Set up routes
staticFileRoutes(app, passport);
authRoutes(app, passport);

app.listen(PORT, () => console.log('listening on port', PORT));
