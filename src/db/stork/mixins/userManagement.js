import H from '../helpers';
import bcrypt from 'bcrypt-nodejs';

const UserManagement = (superclass) => class extends superclass {
  create(obj) {
    console.log('make from obj', obj);
    return this.pg.query(H.createInsertQuery(this.table, this.schema, {
      username: obj.username,
      password: this.generateHash(obj.password)
    }));
  }

  save(obj) {
    return this.create(obj);
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  isValidPassword(password, id) {
    return this.find({id: id})
    .then((user) => {
      return bcrypt.compareSync(password, user[0].password);
    })
    .catch((err) => console.log(err));
  }
};

export default UserManagement;
