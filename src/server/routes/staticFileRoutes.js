import path from 'path';

export default function(app, passport) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/index.html'));
  });
}
