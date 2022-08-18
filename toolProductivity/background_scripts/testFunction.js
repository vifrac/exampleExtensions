// //validar multiples promesas
// let p1 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 500, 'hola mundo')
// );
// let p2 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 600, 'Segundo hola mundo')
// );
// let p3 = Promise.reject();

// let saluda = () => console.log('Hola a todos');
// p1.then(function () {
//   p2.then(function () {
//     saluda();
//   });
// });

// Promise.all([p1, p2, p3])
//   .then((resultados) => {
//     console.log(resultados);
//     saluda();
//   })
//   .catch(() => console.log('falle :('));

function testCallBack() {
  console.log('log before use setTimeout function');
  setTimeout(() => {
    console.log('inside timeout');
  }, 5000);
  console.log('log after use setTimeout function');
}

testCallBack();
