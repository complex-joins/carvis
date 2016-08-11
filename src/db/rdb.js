import db from './db';
import co from 'co';
/* eslint-disable */
const resetDb = function *() {
  yield db.schema.dropTableIfExists('users');
  console.log('dropping users table');
  yield db.schema.dropTableIfExists('rides');
  console.log('dropping rides table');

  if (!(yield db.schema.hasTable('users'))) {
    yield db.schema.createTable('users', function (user) {
      user.increments('id').primary();

      // LOCAL ACCOUNT
      user.string('email', 100).unique();
      user.string('password', 100);

      // LYFT INFO
      user.string('lyftPhoneNumber', 100);
      user.string('lyftToken', 100);

      // UBER INFO
      user.string('uberToken', 100);
      user.string('uberEmailAddress', 100);
      user.string('uberPassword', 100);

      // HOME LOCATION
      user.string('homeLatitude', 100);
      user.string('homeLongitude', 100);
      user.string('homeAddress', 100);

      user.timestamps();
    });
    console.log('created new users table');
  }

  if (!(yield db.schema.hasTable('rides'))) {
    yield db.schema.createTable('rides', function (ride) {
      ride.increments('id').primary();
      ride.string('selectedRide', 255);
      ride.string('origin', 255);
      ride.string('destination', 255);
      ride.string('lyftEstimatedFare', 255);
      ride.string('lyftEstimatedDuration', 100);
      ride.string('uberEstimatedFare', 255);
      ride.string('uberEstimatedDuration', 100);
      ride.timestamps();
    });
    console.log('created new rides table');
  }

  yield db.destroy(); /* eslint-ignore */
  console.log('connection destroyed');
};

co(resetDb);
