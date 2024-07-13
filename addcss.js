// - Add css style to document head
// - Returns appended style element
// - css = style document text
// - id = optional ID for style element
// - addCSS(css, [id])
function addCSS(css, id=null) {
  let styl = document.createElement("style");
  styl.innerHTML = css;
  if (id) styl.id = id;
  document.head.appendChild(styl);
  return styl;
}