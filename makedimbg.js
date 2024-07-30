// - place translucent screen over everything.
// - click or press Escape to dismiss
// - useful for pulling attention to floating window
// - onclickfn replaces click response
// - alsofn runs in addition to default click response
function makedimbg({ source, parentbox, before, onclickfn, fadetime = "0.35s", alsofn, opacity = 0.6, scroll} = {}) {
  let dimbox;

  dimbox = document.createElement("div");
  dimbox.style = "position:fixed;inset:0;background:#444;opacity:0;";
  dimbox.style.transition = `opacity ${fadetime} ease`;

  if (parentbox != null) {
    if (before) {
      parentbox.insertBefore(dimbox, before);
    } else {
      parentbox.appendChild(dimbox);
    }
  } else {
    document.body.appendChild(dimbox);
  }

  // slight delay to let above styles set up first
  setTimeout(function () {
    dimbox.style.opacity = opacity;
  }, 5);


  // if onclick function is set, use it instead.
  // NOTE: custom function must also manage the dimbox (eg let dimbg = makedimbg({onclickfn:functionname}); ----> functionname() {dimbg.remove()};
  onclickfn ??= function (e) {
    e.preventDefault();

    // if alsofn is set, do that ALSO
    if (alsofn instanceof Function) alsofn();

    // fadeout transition
    // note: without fadeout, it's just dimbox.remove() and source.remove();
    dimbox.style.opacity = "0";
    if (source) {
      source.style.transition = `opacity ${fadetime} ease`;
      source.style.opacity = "0";
    }
    setTimeout(function () {
      dimbox.remove();
      if (source) source.remove();
    }, parseFloat(fadetime.replace(/s$/, "")) * 1100);


  };

  dimbox.onclick = dimbox.ontouch = function (e) {
    onclickfn(e);
    window.removeEventListener("wheel", dontscroll);
    window.removeEventListener("keydown", doescape);
  };

  window.addEventListener("keydown", doescape);
  window.addEventListener("wheel", dontscroll, { passive: false });


  function dontscroll(e) {
    if (!scroll) e.preventDefault();
    // console.log("no scrolling");
  }

  function doescape(e) {
    if (e.key == "Escape") {
      e.preventDefault();
      window.removeEventListener("wheel", dontscroll);
      window.removeEventListener("keydown", doescape);
      onclickfn(e);
    } else if (e.code.match(/^(Arrow|Page|Space)/)) {
      // prevent scrolling the main webpage
      console.log(e.code, "No scrolling while dimbg");
      e.preventDefault();
    }
  }


  return dimbox;
}
