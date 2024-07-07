//not sure if this is really useful


function clickit(element) { // simulate mousedown/mouseup/click event
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