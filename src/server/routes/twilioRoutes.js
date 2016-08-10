var createMessage = require('./../utils/twilioHelper');

app.post('/message', (req, res) => {
  console.log('post to message, on server', ' || number: ', req.body.number, '|| message: ', req.body.message);
  createMessage(req.body.number, req.body.message);
  res.status(201)
    .send();
});
