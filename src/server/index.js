import express from 'express';
import { PORT, configureServer } from './config';
import authRoutes from './routes/authRoutes';
import path from 'path';

const app = express();
configureServer(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/phoneForm.html'));
});

app.get('/splash', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/splash.html'));
});
console.log('hello');
authRoutes(app);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
