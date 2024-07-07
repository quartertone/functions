
//     ESCAPE TEXT     //
function escapeHtml(unsafe) { //unidirectional, for display in title="__" only
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
