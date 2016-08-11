import Promise from 'bluebird';
import DB from './dbManagement';
import makeEntity from './entities';

const pgp = require('pg-promise')({promiseLib: Promise});

export default class Stork extends DB {
  constructor(connectionString) {
    super();
    this.connectionString = connectionString;
    this.pg = pgp(connectionString);
    this.relationships = {};
  }

  model(tableName, schema, options = {}) {
    let ProperEntity = makeEntity(options);
    return new ProperEntity(tableName, schema, this.pg, this.relationships);
  }

  connect(dbName) {
    this.connectionString += `/${dbName}`;
    this.pg = pgp(this.connectionString);
  }

  end() {
    return pgp.end();
  }

}
