
//     ESCAPE TEXT     //
function escapeHtml(unsafe) { //unidirectional, for display in title="__" only
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// https://stackoverflow.com/a/31638198
function encode(e) {
  return e.replace(/[^]/g, 
    function (e) {
    return "&#" + e.charCodeAt(0) + ";";
  });
}

//0-9a-zA-Z,.;:-_!@#$%^(){}