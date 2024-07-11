// - check if value is between two others
// - default includes endpoints
function isbetween(num, min, max, equ = true) {
  if (equ) {
    return num >= min && num <= max;
  } else {
    return num > min && num < max;
  }
}