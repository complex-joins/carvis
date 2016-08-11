import User from '../../db/User';
import Ride from '../../db/Ride';
import isAuthenticated from '../server-configuration/isAuthenticated';

export default function(app, passport) {
  // get all user data for a particular user
  // TODO only let the user with that ID find users (middleware);
  app.get('/users/:userid', (req, res) => {
    User.find({id: req.params.userid})
      .then((user) => res.json(user));
  });

  // create a new user
  app.post('/users', (req, res) => {
    User.create(req.body)
      .then((user) => res.json(user));
  });

  // get all rides for a particular user
  app.get('/rides/:userid', (req, res) => {
    Ride.find({userId: req.params.userid})
      .then((rides) => res.json(rides));
  });

  // post a new ride to the db
  app.post('/rides', (req, res) => {
    Ride.create(req.body)
      .then((ride) => res.json(ride));
  });

}
