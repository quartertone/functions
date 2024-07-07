
function timediff(a, b) {
  return Math.round((a - b) / (1000 * 60 * 60)); // closest hour
  // return Math.round(dtto.valueAsNumber - dtfrom.valueAsNumber)/(1000 * 60 * 60); // closest hour
}
