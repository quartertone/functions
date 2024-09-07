
// - "sleep" function for use inside async functions
// - promisetimeout(miliseconsd)
async function promisetimeout(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

function waitforme(millisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(''); }, millisec);
  });
}



// how to use promisetimeout:
// (async function promiseloop() {
// 	for (let x = 0; x < 4; x++) {
// 		console.log("pre-promise", x);
// 		await promisetimeout(2000);
// 		console.log("promise--d", x);
// 	}
// })();

