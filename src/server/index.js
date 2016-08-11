import express from 'express';
import { PORT, configureServer } from './config';
import authRoutes from './routes/authRoutes';
import userDataRoutes from './routes/userDataRoutes';
import staticFileRoutes from './routes/staticFileRoutes';
import apiRoutes from './routes/apiRoutes';

const app = express();

configureServer(app);

// Set up routes
staticFileRoutes(app);
apiRoutes(app);
userDataRoutes(app);
authRoutes(app);


app.listen(PORT, () => console.log('listening on port', PORT));
