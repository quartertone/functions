// - simulate mousedown/mouseup/click event on an element
/**
 * 
 * @param {object} element - HTML element to click
 */
function clickit(element) {
  if (typeof element === "string") {
    // console.log("checking", el);
    element = document.querySelector(element);
  }

  triggerMouseEvent(element, "mousedown");
  setTimeout(() => {
    triggerMouseEvent(element, "mouseup");
    element.click();
  }, 100);

  /**
   * 
   * @param {object} node - element on which to trigger event
   * @param {string} eventType - Event type; see MouseEvent
   */
  function triggerMouseEvent(node, eventType) {
    let event = new MouseEvent(eventType, {
      bubbles: true
    });
    node.dispatchEvent(event);
  }

}