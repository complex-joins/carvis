const db = require('knex')({});

console.log(db.select().from('users').where({username: 'alex', password: 'jealous'}).toString());

let obj = {username: 'alex'};
console.log(Object.keys(obj));
console.log(db.insert(obj).into('users').returning(...Object.keys(obj)))
