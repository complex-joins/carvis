import { db } from './db';
import RideHistory from './RideHistory';

const userSchema = {
  username: 'string',
  password: 'string'
};

// db.createTableIfNotExists('users', userSchema, {user: true})
// .then(() =>
// db.end());

const Users = db.model('users', userSchema, {hash: true});

console.log(Users);

Users.save({username: 'alex', password: 'pass'});
Users.hasMany(RideHistory);
Users.select({username: 'alex'}).show(rideHistory);

console.log(db.relationships);

export default Users;
