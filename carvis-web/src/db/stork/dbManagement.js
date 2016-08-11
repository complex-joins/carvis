import qh from './helpers';

export default class DB {

  dropDb(dbName) {
    console.log(`DROP DATABASE IF EXISTS ${dbName}`);
    return this.pg.query(`DROP DATABASE IF EXISTS ${dbName}`);
  }

  createDb(dbName) {
    console.log(`CREATE DATABASE ${dbName}`);
    return this.pg.query(`CREATE DATABASE ${dbName}`);
  }

  createTable(tableName, schema) {
    let query = qh.createMakeTableQuery(tableName, schema);
    console.log(query);
    return this.pg.query(query);
  }

  createTableIfNotExists(tableName, schema) {
    let query = qh.createMakeTableQuery(tableName, schema, {ifNotExists: true});
    console.log(query);
    return this.pg.query(query);
  }

  dropTable(tableName) {
    return this.pg.query(`DROP TABLE ${tableName}`);
  }
}
