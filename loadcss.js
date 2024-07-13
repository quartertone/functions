// - load CSSS file into head as link
// - loadCSS(url, id)
function loadCSS(url, id) {
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
