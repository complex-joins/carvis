import express from 'express';
import { PORT, configureServer } from './config';
import authRoutes from './routes/authRoutes';

const app = express();
configureServer(app);

app.get('/', (req, res) => {
  res.send('You\'re here! Thanks for coming!');
});

authRoutes(app);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
