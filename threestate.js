// - three-state slider initialization function
// - assocaited styles in threestate.css
function threestate(e) {
  // usage:
  // .onclick = function() {threestate(this)}
  // or
  // .onclick = threestate;
  let target = e.target ?? e;
  console.log(target.dataset.state);
  if (!target.dataset.state) target.dataset.state = 0;
  if (target.dataset.state == "3") return "3";
  target.dataset.state = ++target.dataset.state % 3;

  switch (target.dataset.state) {
    case "0": console.log("off state"); break;
    case "1": console.log("mid state"); break;
    case "2": console.log("end state"); break;
  }
  console.log(target.dataset.state);
  return target.dataset.state;
}
