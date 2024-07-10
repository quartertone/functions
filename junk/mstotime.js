
//https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds

function mstotime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  let millis = Math.floor(milliseconds % 1000 / 100);
  seconds = seconds % 60;
  minutes = minutes % 60;
  // hours = hours % 24; // roll over hours every 24 

  return `${pad2start(hours)}:${pad2start(minutes)}:${pad2start(seconds)}.${millis}`;
}
