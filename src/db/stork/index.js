import Model from './Model';
import UserModel from './UserModel'

export default class DatabaseInstance {
  constructor(configObj, client) {
    this.db = require('knex')({
      client: client,
      connection: configObj
    });
  }
  model(table) {
    return new Model(table, this.db);
  }
}
