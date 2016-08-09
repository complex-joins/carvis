import Entity from './entities';
import qh from './helpers';
import bcrypt from 'bcrypt-nodejs';

export default class Users extends Entity {
  create(obj) {
    console.log('make from obj', obj);
    return this.pg.query(qh.createInsertQuery(this.table, this.schema, {
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
}
