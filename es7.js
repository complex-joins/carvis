const person = {};
const changesHandler = changes => console.log(changes);
Object.observe(person, changesHandler);

person.name = 'Dana'
