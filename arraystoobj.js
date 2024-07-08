// create object from array of keys and array of values
function arraystoobj(keys, values) {
  let obj = {};
  keys.forEach(function (value, index) {

    obj[value] = values[index];

  });
  return obj;
}


//https://www.geeksforgeeks.org/how-to-create-an-object-from-two-arrays-in-javascript/#method-3-using-reduce-method
function createObject(keys, values) {
  const obj = Object.fromEntries(
      keys.map((key, index) => [key, values[index]]),
  );

  return obj;
}



