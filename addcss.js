// append CSS style element to head
function addCSS(css, id=null) {
  let styl = document.createElement("style");
  styl.innerHTML = css;
  if (id) styl.id = id;
  document.head.appendChild(styl);
  return styl;
}