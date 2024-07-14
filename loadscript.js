// - dynamically load JS file
function loadScript(url, { vnum, id, defer, async, module, before, anchor } = {}) {
  //options = ={id: null, anchor: null, defer: false, async: false};
  let script = document.createElement("script"); // create a script DOM node
  script.src = url + "?" + vnum; // set its src to the provided URL
  if (id) { // prevent cluttering up <head> with duplicate <script>s
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
    }
    script.id = id;
  }
  if (defer) script.setAttribute("defer", defer);
  if (async) script.setAttribute("async", async);
  if (module) script.type = "module";

  if (before) {
    document.head.insertBefore(script, before);
  } else if (anchor) {
    anchor.appendChild(script);
  } else {
    document.head.appendChild(script);
  }
  return script;
}
