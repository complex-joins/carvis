const RelationshipQueries = (superclass) => class extends superclass {
  constructor(tableName, schema, pg, relationships, originObject) {
    super(tableName, schema, pg, relationships);
    this.originObject = originObject;
    this.relationshipKey = relationships[tableName].through;
  }

  select(obj) {
    return this.findOne(obj)
    .then((one) => one)
    .catch((err) => console.log(err));
  }

  show(destination) {
    return this.destination.find({[this.relationshipKey]: this.originObject.id});
  }
};

export default RelationshipQueries;
