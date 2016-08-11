const DB_CONFIG_OBJ = require('../../secret/config.js').DB_CONFIG_OBJ;
const db = require('knex')({
  client: 'pg',
  connection: DB_CONFIG_OBJ,
  pool: {
    min: 0,
    max: 16
  }
});

export default db;
