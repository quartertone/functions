// - one-shot function (resettable
function oneshot() {
  if (!oneshot.done) {
    oneshot.done = true;
    console.log("DO SOMETHING");
  } else {
    console.log(" do nothing");
  }
};

// oneshot can be reset if:
// x = oneshot;
// x()
// -- DO SOMETHING
// x()
// -- do nothing
// x.done = false;
// x()
// -- DO SOMETHING



// this version of oneshot has an inaccessible "done" variable, so it is truly oneshot
// - true one-shot (cannot be reset)
var oneshot2 = (function () {
  let done = false; // this value stays with the function object
  return function () { // this is the function that is assigned to oneshot
    if (!done) { // subsequent run will see this function object as  DONE
      done = true; // set the function object to DONE on the  first run
      console.log("DO SOMETHING");
    } else {
      // no action
      console.log("do nothing");
    }
  };
})();
