class RelationshipBuilder {
  constructor(originEntity, destEntity, relationships) {
    this.origin = originEntity;
    this.destination = destEntity;
    this.relationships = relationships;
  }

  through(key) {
    this.relationships[this.origin.table] = {to: this.destination.table, type: 'many', through: key};
  }
}


const RelationshipManagement = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
  }
  hasOne(entity) {
    this.relationships[this.table] = {to: entity.table, type: 'one'};
  }
  hasMany(entity) {
    return new RelationshipBuilder(this, entity, this.relationships);
  }
};

export default RelationshipManagement;
