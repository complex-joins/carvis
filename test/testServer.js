import express from 'express';
import { PORT, configureServer } from '../src/server/server-configuration/config';
import routes from '../src/server/routes';
import userDataRoutes from '../src/server/routes/userDataRoutes';
import staticFileRoutes from '../src/server/routes/staticFileRoutes';

const app = express();

configureServer(app);

// Set up routes
staticFileRoutes(app);
userDataRoutes(app);
authRoutes(app);

export default app;
