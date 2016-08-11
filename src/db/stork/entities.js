import { RelationshipManagement, RelationshipQueries, UserManagement } from './mixins';
import Queries from './queries';
import { mix } from 'mixwith';

const makeEntity = (options) => {
  if (!options.user) {
    return class Entity extends mix(Queries).with(RelationshipManagement, RelationshipQueries) {
      constructor(tableName, schema, pg, relationships) {
        super(tableName, pg, schema);
        new EntityConstructor(tableName, schema, pg, relationships);
      }
    };
  } else {
    return class Entity extends mix(Queries).with(RelationshipManagement, RelationshipQueries, UserManagement) {
      constructor(tableName, schema, pg, relationships) {
        super(tableName, schema, pg, relationships);
        new EntityConstructor(tableName, schema, pg, relationships);
      }
    };
  }
};

export default makeEntity;

function EntityConstructor(tableName, schema, pg, relationships) {
  this.table = tableName;
  this.schema = schema;
  this.pg = pg;
  this.relationships = relationships;
}
