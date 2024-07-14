// - scroll an element into view
function scrollto(element) {
  if (typeof element === "string") {
    // console.log("checking", el);
    element = document.querySelector(element);
  }
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}
