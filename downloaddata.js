// download data as file
function downloaddata(data, name, ext, promptText) {
  let exportfile = name + datefromUTC(new Date()) + ext;
  exportfile = prompt(promptText, exportfile);
  if (exportfile != null) {
    var element = document.createElement('a');
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', exportfile);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    // document.body.removeChild(element);
    element.remove();
  }
}
