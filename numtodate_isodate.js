

function numtodate(date) {
  // date may be a Date object or yyyymmdd/yyyy-mm-dd string
  if (!date || date instanceof Date) date = isodate(date);
  let [, y, m, d] = date.toString().match(/^(\d{4})(\d{2})(\d{2})$/)
    || date.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (y && m && d) return new Date(y, m - 1, d);

  // if (date.toString().match(/^\d+$/)) return new Date(date);
  // this is dumb and useless

}


function isodate(date) {
  date ??= new Date();
  // date is Date object
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
}

function datecalc(date, { years, months, days } = {}) {
  if (date instanceof Date) date = isodate(date);
  // first deconstruct the date string
  let [, y, m, d] = date.toString().match(/^(\d{4})(\d{2})(\d{2})$/)
    || date.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);

  // adjust values
  if (years) y = parseInt(y) + years;
  if (months) m = parseInt(m) + months -1;
  if (days) d = parseInt(d) + days;

  // create new date object (in case of month/year overflow
  console.log("components:",y,m,d);
  let newdate = new Date(y,m,d);
  console.log("claced",date,months, newdate);
  return newdate;

  // return isodate format
  // return isodate(newdate);
}


function timenow() {
  var d = new Date();
  return { h: d.getHours().toString().padStart(2,"0"), m: d.getMinutes().toString().padStart(2,"0") };
}


function timediff(a, b) {
  return Math.round((a - b) / (1000 * 60 * 60)); // closest hour
  // return Math.round(dtto.valueAsNumber - dtfrom.valueAsNumber)/(1000 * 60 * 60); // closest hour
}



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

