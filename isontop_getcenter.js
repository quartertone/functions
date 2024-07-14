
// - Check if element is on top; requires getcenter()
// - returns [element, centercoordinates]
function isontop(el, { ignore } = {}) {
  // return (async () => {
  if (typeof el === "string") {
    // console.log("checking", el);
    el = document.querySelector(el);
  }
  if (!el) return false;

  let c = getcenter(el);

  if (c.x == 0 || c.y == 0) return false;
  let stack = document.elementsFromPoint(c.x, c.y);
  let topel = stack[0];
  if (topel !== el && stack.length > 1) {
    // console.log("not on top:", document.elementsFromPoint(c.x,c.y));
    if (ignore && ignore == stack[0]) {
      // console.log("ignoring mouse");
      topel = stack[1];
    }
    // TODO - remove helpmouse from top andcheck again
  }
  if (topel !== el) return false;
  // console.log(el,c);
  return [el, c]; //topel == el;
  // })();
}

// - get center coordinates of element
// - getcenter(element) -> returns {x:___, y:___}
function getcenter(el) {
  if (!el) {
    // console.log("can't get center of null element", el);
    return false;
  }
  let bounds = el.getBoundingClientRect();
  let center = {
    x: bounds.left * 1 + (bounds.width / 2),
    y: bounds.top * 1 + (bounds.height / 2)
  };
  return center;
}
