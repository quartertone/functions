// - place translucent screen over everything.
// - click or press Escape to dismiss
// - useful for pulling attention to floating window
function makedimbg({ onoff = true, source, parentbox, onclickfn, fadetime = "0.5s" } = {}) {
  let dimbox;

  // if (onoff) { // always set dimmer if this is true

  dimbox = document.createElement("div");
  // dimbox.id = "dimbox";
  dimbox.style = "position:fixed;inset:0;background:#4447;opacity:0;";
  dimbox.style.transition = `opacity ${fadetime} ease`;

  if (parentbox != null) {
    parentbox.appendChild(dimbox);
  } else {
    document.body.appendChild(dimbox);
  }

  setTimeout(function () {
    dimbox.style.opacity = "1";
  }, 5);

  // } else if (!onoff) {
  //   // remove the dimmer
  //   dimbox = document.getElementById("dimbox");
  //   dimbox.remove();
  // }

  // if onclick function is set, use it instead.
  // NOTE: custom function must also manage the dimbox (eg let dimbg = makedimbg({onclickfn:functionname}); ----> functionname() {dimbg.remove()};
  onclickfn ??= function (e) {
    e.preventDefault();
    dimbox.remove();
    if (source) source.remove();
  };

  dimbox.onclick = dimbox.ontouch = function (e) {
    onclickfn(e);
  };

  function doescape(e) {
    if (e.key == "Escape") {
      window.removeEventListener("keydown", doescape);
      e.preventDefault();
      onclickfn(e);
    }
  }

  window.addEventListener("keydown", doescape);

  return dimbox;
}