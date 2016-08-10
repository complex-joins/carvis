import Promise from 'bluebird';
import Entity from './entities';
import Hash from './hash';
import qh from './helpers';

const pgp = require('pg-promise')({promiseLib: Promise});

export default class Stork {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.pg = pgp(connectionString);
    this.relationships = {};
  }

  model(tableName, schema, options) {
    console.log('making model');
    if (options && options.hash) {
      return new Hash(tableName, schema, this.pg, this.relationships);
    } else {
      return new Entity(tableName, schema, this.pg, this.relationships);
    }
  }

  connect(dbName) {
    this.connectionString += `/${dbName}`;
    this.pg = pgp(this.connectionString);
  }

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

  end() {
    return pgp.end();
  }

}
