// Not useful

function ignorecomments(txt) { // convert multiline string to array, ignore "//"
  return txt.split(/\n/).filter((line) => (line != "" && !/^\/\//.test(line)));
}