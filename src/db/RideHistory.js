import {db} from './db';

const rideHistorySchema = {
  date: 'string',
  chosenRide: 'string',
  uberCost: 'string',
  uberTimeEstimate: 'string',
  lyftCost: 'string',
  lyftTimeEstimate: 'string'
};


db.createTableIfNotExists('rideHistory', rideHistorySchema)
.then(() =>
db.end());

const RideHistory = db.model('rideHistory', rideHistorySchema);


export default RideHistory;
