// - place translucent screen over everything. responds to click events. (useful for pulling attention to floating window)
function makedimbg({ onoff = true, source, parentbox, onclickfn, fadetime = "0.5s" } = {}) {
  let dimbox;

  // if (onoff) { // always set dimmer if this is true

  dimbox = document.createElement("div");
  // dimbox.id = "dimbox";
  dimbox.style = "position:fixed;inset:0;background:#4447;opacity:0;";
  dimbox.style.transition = `opacity ${fadetime} ease`;

  if (parentbox != null) {
    // if parentbox is given, append to that instead of body
    parentbox.appendChild(dimbox);
  } else {
    document.body.appendChild(dimbox);
  }

  setTimeout(function () {
    // fade in
    dimbox.style.opacity = "1";
  }, 5);
  // } else if (!onoff) {
  //   // remove the dimmer
  //   dimbox = document.getElementById("dimbox");
  //   dimbox.remove();
  // }

  if (onclickfn) {
    // if onclick function is set, use it instead.
    // NOTE: custom function must also manage the dimbox (eg let dimbg = makedimbg({onclickfn:functionname}); ----> functionname() {dimbg.remove()};
    dimbox.onclick = dimbox.ontouch = function (e) {
      onclickfn(e);
    };
  } else {
    dimbox.onclick = dimbox.ontouch = function (e) {
      e.preventDefault();
      dimbox.remove();
      if (source) source.remove();
    };
  }
  return dimbox;
}