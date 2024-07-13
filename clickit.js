// - simulate mousedown/mouseup/click event on an element
// - clickit(element)
function clickit(element) {
  if (typeof element === "string") {
    // console.log("checking", el);
    element = document.querySelector(element);
  }

  function triggerMouseEvent(node, eventType) {
    let event = new MouseEvent(eventType, {
      bubbles: true
    });
    node.dispatchEvent(event);
  }
  triggerMouseEvent(element, "mousedown");
  setTimeout(() => {
    triggerMouseEvent(element, "mouseup");
    element.click();
  }, 100);
}