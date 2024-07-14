// - flash a marker on an element
function spark({x, y}={}, { interval = 1000, anchor = document.body, size = "2em", color = "green" } = {}) {
  return new Promise((resolve) => {
    let spk = document.createElement("div");
    // spk.id = "spark";
    spk.style = "position: fixed; display: block; z-index: 9000; width: 0; height: 0; pointer-events: none; background: transparent; border: 0 solid; border-radius: 50%; transition: all 1.5s cubic-bezier(0, 0.91, 0.2, 0.97);"
    spk.style.left = x +"px";
    spk.style.top = y + "px";
    spk.style.borderColor = color;
    anchor.append(spk);
    setTimeout(() => {
      spk.style.borderWidth = size;
      spk.style.margin = `-${size} 0 0 -${size}`;
      spk.style.opacity = 0;
      setTimeout(() => {
        spk.remove();
      }, interval * 0.8);
      setTimeout(() => {
        resolve(true);
      }, interval * 0.15);
    }, 10);
  });
}
