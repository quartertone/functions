// - convenience fn to create DIV element
// - makediv(id, { tag = "div", cls = "", inner = "" })
function makediv(id, { tag = "div", cls = "", inner = "" } = {}) {
  let thisdiv = document.createElement(tag);
  thisdiv.id = id;
  thisdiv.className = cls;
  thisdiv.innerHTML = inner;
  return thisdiv;
}
