import { expect } from 'chai';
import learningCI from './learnCI';
import axios from 'axios';

describe('API Test', () => {

  it('should enter users into the database', () => {
    let userToEnterIntoDb = {
      email: 'alex@gmail.com',
      password: 'jkljhwelkj'
    };
    axios.post('/users/', userToEnterIntoDb)
    .then((user) => axios.get('/users/' + user.id))
    .then((user) => {
      expect(user).to.equal(userToEnterIntoDb);
    });
  });

  it('should enter rides into the database', () => {
    let ride = {
      userId: 1,
      origin: 'alex@gmail.com',
      destination: 'jkljhwelkj'
    };
    axios.post('/users/', userToEnterIntoDb)
    .then((user) => axios.get('/users/' + user.id))
    .then((user) => {
      expect(user).to.equal(userToEnterIntoDb);
    });
  });

});
