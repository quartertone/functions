
function makearray(start, end) {
  if (!end) {
    end = start - 1;
    start = 0;
  }
  return [...Array(end + 1).keys()].slice(start);
}
// makearray(3) == [0,1,2]
// makearray(5,9) == [5,6,7,8,9]
