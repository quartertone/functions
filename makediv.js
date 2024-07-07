// convenience fn to create DIV element

function makediv(id, { tag = "div", cls = "", inner = "" } = {}) {
  let thisdiv = document.createElement(tag);
  thisdiv.id = id;
  thisdiv.className = cls;
  thisdiv.innerHTML = inner;
  return thisdiv;
}
