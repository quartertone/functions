
function loadScript(url, options, vnum) { // dynamically load JS
  //options = ={id: null, anchor: null, defer: false, async: false};
  let script = document.createElement("script"); // create a script DOM node
  script.src = url + "?" + vnum; // set its src to the provided URL
  if (options.id) { // prevent cluttering up <head> with duplicate <script>s
    if (document.getElementById(options.id)) {
      document.getElementById(options.id).remove();
    }
    script.id = options.id;
  }
  if (options.defer) script.setAttribute("defer", options.defer);
  if (options.async) script.setAttribute("async", options.async);
  if (options.module) script.type = "module";

  if (options.before) {
    document.head.insertBefore(script, options.before);
  } else if (options.anchor) {
    options.anchor.appendChild(script);
  } else {
    document.head.appendChild(script);
  }
  return script;
}
