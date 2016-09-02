import path from 'path';

export default app => {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../client/index.html'));
  });
};
