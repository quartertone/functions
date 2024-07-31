// - bidirectional array equiv checker
// - Check if two arrays are equivalent (contain the same elements)
/**
 * 
 * @param {array} a 
 * @param {array} b 
 * @returns {boolean}
 */
function arrayequivalent(a, b) {
  let x = a.every((e) => {
    return b.includes(e);
  });
  let y = b.every((e) => {
    return a.includes(e);
  });
  //must compare in both directions
  return x && y;
}
