import { db } from './db';
import Rides from './RideHistory';

const userSchema = {
  username: 'string',
  password: 'string'
};

// db.createTableIfNotExists('users', userSchema, {user: true})
// .then(() =>
// db.end());

const User = db.model('users', userSchema, {hash: true});


// User.save({username: 'alex', password: 'pass'});
User.hasMany(Rides).through('userId');

console.log(User.select({username: 'alex'}));
User.select({username:'alex'}).then(()=>)
// .show(Rides);

console.log(db.relationships);

export default User;
