async function select() {
  let message = await fakeAsync();
  return message;
}


function fakeAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({message: 'hi'});
    }, 1000);
  });
}
