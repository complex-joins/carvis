export class RelationshipBuilder {
  constructor(originEntity, destEntity, relationships) {
    this.origin = originEntity;
    this.destination = destEntity;
    this.relationships = relationships;
  }

  through(key) {
    this.relationships[this.origin.table] = {to: this.destination.table, type: 'many', through: key};
  }
}

export class RelationshipQuery {
  constructor(originObject, originTable, relationships) {
    this.originObject = originObject;
    this.relationshipKey = relationships[originTable].through;
  }

  show(destination) {
    return this.destination.find({[this.relationshipKey]: this.originObject.id});
  }
}

User.select({username: 'alex'}).show(Rides);

User.hasMany(Rides).through(userId);
