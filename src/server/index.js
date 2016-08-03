import express from 'express';
import { PORT, configureServer } from './config';

const app = express();
configureServer(app);

app.get('/', (req, res) => {
  res.send('You\'re here! Thanks for coming!');
});


app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
