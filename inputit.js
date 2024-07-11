// - INPUT text entry simulator
function inputit(element, newtext, { clobber = false, interval = 100 } = {}) {
  return new Promise((resolve, reject) => {
    function doinput(element, newval, clobber) {
      if (element.type == "range") {
        setTimeout(() => {
          element.value = newval;
          element.dispatchEvent(new Event("input"));
          resolve("range entered");
        }, interval);
      } else {
        newval = newval.toString().replace(/_/g, " "); // use _ as space
        if (clobber) element.value = "";
        if (!newval) {
          element.dispatchEvent(new Event("input"));
          element.blur();
          resolve("text entered");
          return;
        }
        let [, fc, text] = newval.match(/^(.)(.*)$/s);
        setTimeout(() => {
          element.value += fc; // input characters one at a time
          doinput(element, text, false); // continue with remainder of text
        }, interval);
      }
    }
    doinput(element, newtext, clobber);
  });
}
