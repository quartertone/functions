// https://decode.sh/seeded-random-number-generator-in-js/
function random(seed) {
  seed ??= Math.random() * 10**9;
  let m = 2 ** 35 - 31;
  let a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}

/* usage:
let rng = random(123456);

rng();
>>> [some random number <1]
*/



// get random value between min/max, inclusive
function minmax(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}


function minmaxexcept(min, max, except) {
  let num = min + Math.floor(Math.random() * (max - min + 1));
  return num == except ? minmaxexcept(min, max, except) : num;
}





function randarray(arr,except) {
  let num = arr[Math.floor(Math.random() * (arr.length))];
  return (except && except.includes(num)) ? randarray(arr,except) : num;
}

