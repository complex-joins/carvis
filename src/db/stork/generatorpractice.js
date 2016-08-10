function fakeAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({message: 'hi'});
    }, 1000);
  });
}

function Obj(obj) {
  this.exists = true;
  this.func = function() {
    console.log(obj.message);
  };
}

function *genSelect() {
  let one = yield fakeAsync();
  return new Obj(one);
}

function runWithPromise(generator) {
  let gen = generator();
  let val;
  let waitingForVal = true;
  gen.next().value
  .then(res => {
    gen.next(res).value;
  });
}

console.log(runWithPromise(genSelect));
// function select() {
//   , (generatedObject) => {
//
//   });
// }
// GOAL
// select().func();


// console.log(readSync());

//
// function async(makeGenerator){
//   return function (){
//     var generator = makeGenerator.apply(this, arguments)
//
//     function handle(result){ // { done: [Boolean], value: [Object] }
//       if (result.done) return result.value
//
//       return result.value.then(function (res){
//         return handle(generator.next(res))
//       }, function (err){
//         return handle(generator.throw(err))
//       })
//     }
//
//     return handle(generator.next())
//   }
// }
