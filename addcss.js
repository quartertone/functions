// - Add css style to document head
// - Returns appended style element
// - css = style document text
// - id = optional ID for style element
// - addCSS(css, [id])
function addCSS(css, id, anchor) { // append CSS style element to head
	let styl = document.querySelector(`#${id}`) ?? document.createElement("style");
  styl.innerHTML = css;
  styl.id = id;
  anchor ? anchor.appendChild(styl) : document.head.appendChild(styl);
  return styl;
}