import Stork from '../stork';
const DB_CONFIG_OBJ = require('../../../../secret/config.js').DB_CONFIG_OBJ;

const db = new Stork(DB_CONFIG_OBJ);

db.dropTable('rides')
.then(()=> db.createTableIfNotExists('rides', Ride.schema))
.then(() => db.end())
.catch((err) => console.log(err));

db.dropTable('users')
.then(() => db.createTableIfNotExists('users', User.schema, {user: true}))
.then(() => db.end())
.catch((err) => console.log(err));

const ridesSchema = {
  userId: 'number',
  date: 'string',
  chosenRide: 'string',
  uberCost: 'string',
  uberTimeEstimate: 'string',
  lyftCost: 'string',
  lyftTimeEstimate: 'string'
};
const userSchema = {
  username: 'string',
  password: 'string'
};

const Ride = db.model('rides', ridesSchema);

const User = db.model('users', userSchema, {user: true});

// User.save({username: 'alex', password: 'pass'});
User.hasMany(Ride).through('userId');

console.log(User.relationships);
