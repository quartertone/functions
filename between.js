
// check if value is between two others
// default includes endpoints
function between(vari, min, max, equ = true) {
  if (equ) {
    return vari >= min && vari <= max;
  } else {
    return vari > min && vari < max;
  }
}