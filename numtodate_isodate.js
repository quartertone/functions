function numtodate(date) {
  // date may be a Date object or yyyymmdd/yyyy-mm-dd string
  if (date instanceof Date) date = isodate(date);
  let [, y, m, d] = date.toString().match(/^(\d{4})(\d{2})(\d{2})$/)
    || date.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return new Date(y, m - 1, d);
}


function isodate(date) {
  // date is Date object
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
}
