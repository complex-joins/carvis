/* eslint-disable */
async function select() {
  let test = await fakeAsync();
  return test;
}


function fakeAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({message: 'hi'});
    }, 1000);
  });
}

console.log(select());
