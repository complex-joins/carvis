import {db} from './db';

const ridesSchema = {
  userId: 'number',
  date: 'string',
  chosenRide: 'string',
  uberCost: 'string',
  uberTimeEstimate: 'string',
  lyftCost: 'string',
  lyftTimeEstimate: 'string'
};


db.createTableIfNotExists('rides', ridesSchema)
.then(() =>
db.end());

const Ride = db.model('rides', ridesSchema);


export default Ride;
