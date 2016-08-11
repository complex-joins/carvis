import db from './db';

knex.schema.createTable('users', function (table) {
  table.increments();
  table.string('name');
  table.timestamps();
})

const Ride = db.model('rides', ridesSchema);


export default Ride;
