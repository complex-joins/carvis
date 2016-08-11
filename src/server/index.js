import express from 'express';
import { PORT, configureServer } from './config';
import authRoutes from './routes/authRoutes';
import staticFileRoutes from './routes/staticFileRoutes';
import apiRoutes from './routes/apiRoutes';
import passport from 'passport';

const app = express();

configureServer(app, passport);

// Set up routes
staticFileRoutes(app, passport);
apiRoutes(app, passport);
authRoutes(app, passport);


app.listen(PORT, () => console.log('listening on port', PORT));
