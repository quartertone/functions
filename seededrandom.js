// https://decode.sh/seeded-random-number-generator-in-js/
function random(seed) {
  let m = 2 ** 35 - 31;
  let a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}
