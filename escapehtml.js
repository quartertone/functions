
// - replace selected HTML chars with HTML entities
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// https://stackoverflow.com/a/31638198
// - replaces HTML chars with charcodes
function encode(string) {
  // return e.replace(/[^]/g,
  return string.replace(/[^0-9a-zA-Z'",.;:-_#^<>(){}]/g,
    function (str) {
      return "&#" + str.charCodeAt(0) + ";";
    });
}
