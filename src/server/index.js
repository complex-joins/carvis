import express from 'express';
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
  res.send('You\'re here! Thanks for coming!');
});


app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
