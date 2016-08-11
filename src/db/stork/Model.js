class Model {
  constructor(table, db) {
    this.db = db;
    this.table = table;
    this.relationships = [];
  }

  findAll() {
    return this.db.select().from(this.table);
  }

  find(obj) {
    return this.db.select().from(this.table).where(obj);
  }

  create(obj) {
    return this.db.insert(obj).into(this.table).returning(...Object.keys(obj));
  }

  save(obj) {
    return this.create(obj).returning(...Object.keys(obj));
  }

  update(criteriaObj, updateObj) {
    return this.db(this.table)
      .update(updateObj, [...updateObj])
      .where(criteriaObj)
      .returning(...Object.keys(updateObj));
  }

  remove(obj) {
    return this.db(this.table)
      .where(obj)
      .del();
  }

}

export default Model;
