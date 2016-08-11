import { db } from './db';
import Ride from './Rides';

const userSchema = {
  username: 'string',
  password: 'string'
};

// db.createTableIfNotExists('users', userSchema, {user: true})
// .then(() =>
// db.end());

const User = db.model('users', userSchema, { hash: true });

// User.save({username: 'alex', password: 'pass'});
User.hasMany(Ride)
  .through('userId');

User.select({ username: 'alex' })
  .then((user) => {
    console.log(user.show(Ride));
  });


// .show(Rides);

console.log(db.relationships);

export default User;
