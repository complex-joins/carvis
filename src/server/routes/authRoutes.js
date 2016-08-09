import path from 'path';

export default function(app) {
  app.post('/auth/phoneNumber', (req, res) => {
    // MAKE REQUEST TO LYFT FOR 4 DIGIT CODE
    let phoneNumber = req.body.phoneNumber;
    console.log('phone number is ', phoneNumber);

    res.redirect('/auth/lyftCode');
  });

  app.post('/auth/lyftCode', (req, res) => {
    let lyftCode = req.body.lyftCode;
    console.log('got code', lyftCode);
    // RETURN 4 digit code
    res.send('success!');
  });
}
