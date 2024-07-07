
// // one-shot function

var oneshot = (function () {
  let done = false; // this value stays with the function object
  return function () { // this is the function that is assigned to oneshot
    if (!done) { // subsequent run will see this function object as  DONE
      done = true; // set the function object to DONE on the  first run
      console.log("DO SOMETHING");
    } else {
      // no action
    }
  };
})();
// oneshot(); // "DO SOMETHING"
// oneshot(); // (no action)
// "done" variable is externally inaccessible, so this is truly one shot

// Cleaner version? not declared as variable, so does not need to be put at the top
function oneshot2() {
  if (!oneshot2.done) {
    oneshot2.done = true;
    console.log("DO SOMETHING");
  } else {
    // no action
    console.log(" do nothing");
  }
};


