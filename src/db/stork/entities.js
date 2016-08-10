import qh from './helpers';
import Promise from 'bluebird';
import { RelationshipBuilder, RelationshipQuery } from './relationships';

const pgp = require('pg-promise')({promiseLib: Promise});
const { insert, update } = pgp.helpers;

export default class Entity {
  constructor(tableName, schema, pg, relationships) {
    // TODO this.table = new TableName(tableName, schema); // this automatically wraps up a schema, plus knows how to be formatted;
    this.table = tableName;
    this.schema = schema;
    this.pg = pg;
    this.relationships = relationships;
    // TODO event loop this.queryQueue = [];
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
    return this.pg.query(qh.createSelectQuery(this.table, this.schema, obj));
  }

  findOne(obj) {
    return this.find(obj).then((users) => users[0]);
  }

  update(obj) {
    return this.pg.query(update(obj, null, this.table));
  }

  save(obj) {
    // return this.pg.query(qh.createInsertQuery(this.tableName, this.schema, obj));
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

  hasOne(entity) {
    this.relationships[this.table] = {to: entity.table, type: 'one'};
  }

  hasMany(entity) {
    return new RelationshipBuilder(this, entity, this.relationships);
  }

  select(obj) {
    return this.findOne(obj)
    .then((one) => {
      let rq = new RelationshipQuery(one, this.table, this.relationships);
      return rq;
    })
    .catch((err) => console.log(err));

  }
  // TODO try to make synchronous
  // _runEventLoop () {
  //   if (this.queryQueue.length > 0) {
  //     this.queryQueue.forEach(({fn, args}) => {
  //     })
  //   }
  // }
}
