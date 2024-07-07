
function clickpoint(x, y) {
  var ev = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true,
    'screenX': x,
    'screenY': y
  });
  console.log(x, y);
  var el = document.elementFromPoint(x, y);
  el.dispatchEvent(ev);
}
