// https://cordova.apache.org/docs/en/11.x/cordova/storage/storage.html
// - set/read/delete "cookie" stored in localstorage
// - localCookie(name, value)
function localCookie(name, value) {
  // if only name, retrieve item value
  // if name & value, set item
  // if value === null , remove item
  // value can be set to false or 0
  try {
    var storage = window.localStorage;
  } catch {
    console.warn("LocalStorage not available");
    return undefined;
  }
  if (!name) {
    return undefined;
  } else if (value === undefined) {
    return storage.getItem(name);
  } else if (value === null) {
    storage.removeItem(name);
    return true;
  } else if (value) {
    storage.setItem(name, value);
    return value.toString();
  }
}

