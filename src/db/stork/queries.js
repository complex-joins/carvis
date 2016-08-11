import H from './helpers';
const pgp = require('pg-promise')({promiseLib: Promise});

const { insert, update } = pgp.helpers;

export default class Queries {
  constructor (pg, table, schema) {
    this.pg = pg;
    this.table = table;
    this.schema = schema;
  }

  findAll() {
    return this.pg.query('select * from ${table}', this);
  }

  findById(id) {
    return this.pg.query('select * from ${table} where id = ${id}', {table: this.table, id});
  }

  find(obj) {
    // TODO you might want to change this to use type TableName instead, which already contains table+schema+formatting
    // the destination should only use pre-formatted table.name
    return this.pg.query(H.createSelectQuery(this.table, this.schema, obj));
  }

  findOne(obj) {
    return this.find(obj).then((users) => users[0]);
  }

  update(obj) {
    return this.pg.query(update(obj, null, this.table));
  }

  save(obj) {
    // return this.pg.query(H.createInsertQuery(this.tableName, this.schema, obj));
    return this.pg.query(insert(obj, null, this.table));
  }

  create(obj) {
    return this.save(obj);
  }

  findOrCreate(obj) {
    return this.findOne(obj)
    .then((foundObj) => foundObj ? foundObj : this.create(obj));
  }

  remove(id) {
    return this.pg.query('delete from ${table} where id = ${id}', {table: this.table, id});
  }

  
}
