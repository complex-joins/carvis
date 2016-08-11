
const db = require('knex')({
  client: 'pg',
  connection: DB_CONFIG_OBJ
});

export default db;
