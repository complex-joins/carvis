var twilioCredentials = require('../../../secret/config.js').twilioCredentials;
var client = require('twilio')(twilioCredentials.accountSid, twilioCredentials.authToken);

// NOTE: Twilio will only work with approved numbers on the free trial account, for now Chris' number is approved.
// NOTE: a test notice is included in all messages until we load $$$ to Twilio.

// Twilio SMS send to be invoked via a client side form, which upon click sends a POST request to our server on the '/message' path with a body of { number: targetPhoneNumber, message: intendedMessage }

// Twilio Functions
function createMessage(number, message) {
  client.messages.create({
    to: number,
    from: "+19495417437",
    body: message
  }, function (err, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!err) {
      // The second argument to the callback will contain the information
      // sent back by Twilio for the request. In this case, it is the
      // information about the text messsage you just sent:
      console.log('Success! The SID for this SMS message is:', message.sid);
      console.log('Message sent on:', message.dateCreated);
    } else {
      console.log('Error in Twilio SMS send', err);
    }
  });
}

module.exports = createMessage;
