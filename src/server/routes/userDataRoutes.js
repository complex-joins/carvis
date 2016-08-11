export default function(app) {
  app.get('/:userid/profile', (req, res) => {
    // get basic profile info
      // home location, etc
  });

  app.post('/:userid/profile', (req, res) => {
    // accept changes to user profile
  });

  // STATS SERVICE?
  app.get('/:userid/rideHistory', (req, res) => {
    // get history from stats service?
  });
  app.get('/:userid/savings', (req, res) => {
    // get savings from stats service?
  });
}
