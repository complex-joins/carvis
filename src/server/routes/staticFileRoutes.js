import path from 'path';

export default function(app, passport) {
  app.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
      res.sendFile(path.join(__dirname, '/../client/splash.html'));
    } else {
      res.sendFile(path.join(__dirname, '/../client/index.html'));
    }
  });
}
