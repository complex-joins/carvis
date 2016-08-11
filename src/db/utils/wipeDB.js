import dbm from '../dbm';
import {RideSchema} from '../Ride';
import {UserSchema} from '../User'; 
const {db} = dbm;

const resetDb = async function() {
  await db.schema.dropTableIfExists('users');
  console.log('dropping users table');
  await db.schema.dropTableIfExists('rides');
  console.log('dropping rides table');

  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', UserSchema);
    console.log('created new users table');
  }

  if (!(await db.schema.hasTable('rides'))) {
    await db.schema.createTable('rides', RideSchema);
    console.log('created new rides table');
  }

  await db.destroy(); /* eslint-ignore */
  console.log('connection destroyed');
};

resetDb();
