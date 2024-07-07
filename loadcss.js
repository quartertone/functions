
function loadCSS(url, id) { // load CSS file into head as link
  if (document.getElementById(id) == null) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.type = "text/css";
    link.id = id;
    document.head.appendChild(link);
    return link;
  }
}
