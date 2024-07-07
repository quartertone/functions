
// TIMOUT as promise
function promisetimeout(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

// // this is how to use promisetimeout
// (async function promiseloop() {
// 	for (let x = 0; x < 4; x++) {
// 		console.log("pre-promise", x);
// 		await promisetimeout(2000);
// 		out.innerHTML += x + "<br/>";
// 		console.log("promise--d", x);
// 	}
// })();

