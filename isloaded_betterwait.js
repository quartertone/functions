
// isLOADED CHECKER //
//////////////////////
// wait until element is loaded
// https://www.nikitakazakov.com/js-wait-until-loaded-dom-element
// https://stackoverflow.com/questions/16149431/make-function-wait-until-element-exists/53269990#53269990


const isElementLoaded = async selector => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};
// USAGE: selector can be a .class or #id
/* 
isElementLoaded('#edd_date').then((selector) => {
  // DO THINGS HERE
});
*/


////////////////
// BetterWait //
////////////////
// based on "waitFor()"
// wait for condition to be true, with timeout and external stop options
function betterWait(conditionFunction, { poll = 1000, timeout = 600000, stopper = { stop: false } } = {}) {
  // use destructuring to make it easier to hold onto default values
  let stopwatch = new Date().getTime();
  return new Promise((resolve, reject) => {
    function checkstatus() {
      let newtime = new Date().getTime();
      let condresult = conditionFunction();
      if (condresult)
        resolve(condresult);
      // stopper is an object so that it can be manipulated by unconnected functions
      if (stopper && stopper.stop) reject("STOP");
      else if (timeout > 0 && newtime - stopwatch > timeout)
        reject("TIMEOUT");
      else
        setTimeout(_ => checkstatus(), poll);
    }
    checkstatus(); // initialize the loop
  });
}
// HOW to use betterWait
// stopvar = {};
// betterWait(() => {return false}, {timeout:3000, stopper:stopvar}).then((e) => console.log("good", e)).catch((e) => console.log(e));


