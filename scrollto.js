// - scroll an element into view
// - scrollto(element)
function scrollto(el) {
  if (typeof el === "string") {
    // console.log("checking", el);
    el = document.querySelector(el);
  }
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}
