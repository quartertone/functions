// do we need this?
// I feel like there is a builtin js function that does this....
function arraystoobj(array1, array2) {
  let obj = {};
  array1.forEach(function (value, index) {

    obj[value] = array2[index];

  });
  return obj;
}

