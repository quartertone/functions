
function timenow() {
  var d = new Date();
  return { h: d.getHours().toString().padStart(2,"0"), m: d.getMinutes().toString().padStart(2,"0") };
}


// make non-moment functions:



// local date/time as date-only UTC value
function localDate() {
  // return (ne w Da te((ne w Dat e(timenumber)).toDateString() + " GMT").getTime();
  return moment.utc(moment().format("YYYY-MM-DD")).valueOf();
}

// UTC date value into YYYY-MM-DD
function datefromUTC(time) {
  if (!time) time = undefined;
  return moment.utc(time).format("YYYY-MM-DD");
  // var time = new Date(time);
  // return time.getUTCFullYear() + "-" + (new String(time.getUTCMonth() + 1)).padStart(2, "0") + "-" + (new String(time.getUTCDate())).padStart(2, "0");
}

// date object/string/value to UTC value
function timefromDate(datestring) {
  if (!datestring) datestring = undefined;
  return moment.utc(datestring).valueOf();
  // return new Date(datestring).getTime();
}



// `datestring` can be string, timevalue, or Date
function formatDate(datestring) {
  if (!datestring) datestring = undefined;
  // return mom ent((n ew Da te(dates tring)).getT ime()).utc().for mat(d ate Fo rmat)
  let actualformat = typeof dateFormat !== "undefined" ? dateFormat : "LL";
  return moment.utc(datestring).format(actualformat);
  // need UTC again because datestring may be a time number
}
