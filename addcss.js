// - Add css style to document head
// - Returns appended style element
// - css = style document text
// - id = optional ID for style element
/**
 * 
 * @param {string} css - raw css style text
 * @param {string} [id] - optional ID of new style element
 * @param {object} [anchor] - DOM element where style is to be appended
 * @returns {object} HTML style element with embedded styles
 */
function addCSS(css, id, anchor) { // append CSS style element to head
	let styl = document.querySelector(`#${id}`) ?? document.createElement("style");
  styl.innerHTML = css;
  styl.id = id;
  anchor ? anchor.appendChild(styl) : document.head.appendChild(styl);
  return styl;
}