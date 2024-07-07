
// direct cutoutfrom helpvideo.js
// improved - use this for basicutilities
function spark(x, y, { interval = 1000, anchor = document.body, ssize = "1.25em", color = "green" } = {}) {
  return new Promise((resolve) => {
    let spk = document.createElement("div");
    spk.id = "sparky";
    spk.style.left = x;
    spk.style.top = y;
    spk.style.borderColor = color;
    anchor.append(spk);
    setTimeout(() => {
      spk.style.borderWidth = ssize;
      spk.style.margin = `-${ssize} 0 0 -${ssize}`;
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
