

# Collection of useful Javascript functions
WORKINPROGRESS.js
  - tri-check:
  - drop-down:
addcss.js
  - addCSS:
    - Add css style to document head
    - Returns appended style element
arrayequivalent.js
  - arrayequivalent:
    - bidirectional array equiv checker
    - Check if two arrays are equivalent (contain the same elements)
arrayshuffle.js
  - ashuffle:
    - Shuffle array and return the result
arraystoobj.js
  - arraystoobj:
    - create object from array of keys and array of values (array.forEach method)
  - createObject:
    - create object from array of keys and array of values (Object.fromEntries method)
clickit.js
  - clickit:
    - simulate mousedown/mouseup/click event on an element
clickpoint.js
  - clickpoint:
    - simulate click event on x,y coordinates
downloaddata.js
  - downloaddata:
    - download given data as a file
dragelement.js
  - dragElement:
    - make an element draggable
escapehtml.js
  - escapeHtml:
    - replace selected HTML chars with HTML entities
  - encode:
    - replaces HTML chars with charcodes
gridcal_new.js
  - grid-cal:
    - custom element date picker (uses showmonth.js)
    - Resulting date is formatted Y-MM-DD (eg - 2019-05-28)
    - <grid-cal title="Calendar Title"></grid-cal>
    - divname.value holds results
    - divname.oninput to respond to changes
    - innerHTML is set to title attribute
    - setting divname.value="" will also set innerHTML to title again
    - styles set in gridcal.css and showmonth.css
inputit.js
  - inputit:
    - INPUT text entry simulator
isbetween.js
  - isbetween:
    - check if value is between two others
    - default includes endpoints
isloaded_betterwait.js
  - isElementLoaded:
    - wait until element is loaded
    - resolve promise when element is loaded (uses requestAnimationFrame)
  - betterWait:
    - resolve promise when condition becomes true
    - uses setTimeout and polling interval
    - consider switching to [requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)
isontop_getcenter.js
  - isontop:
    - Check if element is on top; requires getcenter()
  - getcenter:
    - get center coordinates of element
loadcss.js
  - loadCSS:
    - load CSSS file into head as link
loadscript.js
  - loadScript:
    - dynamically load JS file
localcookie.js
  - localCookie:
    - set/read/delete "cookie" stored in localstorage
makearray.js
  - makearray:
    - convenience function to create an array of x numbers, or an array with values between x and y
makedimbg.js
  - makedimbg:
    - place translucent screen over everything.
    - click or press Escape to dismiss
    - useful for pulling attention to floating window
makediv.js
  - makediv:
    - convenience fn to create DIV element
numtodate_isodate.js
  - numtodate:
    - convert string date into Date object
  - isodate:
    - return yyyy-mm-dd format of date object
  - datecalc:
    - take Date object (or yyyy-mm-dd) and return new Date object after doing date math
  - timenow:
    - return local time
  - timediff:
    - return time difference to the closest hour
    - TODO: make this more generalizable (granularity options)
  - mstotime:
    - convert milliseconds to time (H:m:s)
  - getwkday:
    - get shortname of weekday in specified locale (or default)
oneshot.js
  - oneshot:
    - one-shot function (resettable
  - oneshot2:
    - true one-shot (cannot be reset)
pad2start.js
  - pad2start:
    - convenience function to pad a number with 0s for up to 2 digits
promiseprompt.js
  - promiseprompt:
    - interactive dialog that resolves to a promise. Requires makedimbg
    - necessary styles in promiseprompt.css 
promisetimeout.js
  - promisetimeout:
    - "sleep" function for use inside async functions
randoms.js
  - random:
    - seeded pseudo random number generator
  - minmax:
    - get random value between min/max, inclusive
  - minmaxexcept:
    - random integer except some number
  - randarray:
    - rreturn andom array element; optional exclusion parameter
scrollto.js
  - scrollto:
    - scroll an element into view
showmonth.js
  - showmonth:
    - display interactive calendar
    - option for showing multiple months
    - styles set in showmonth.css
spark.js
  - spark:
    - flash a marker on an element
threestate.js
  - threestate:
    - three-state slider
    - assocaited styles in threestate.css
inprogress/circlemenujs.js
  - floatmenu:
  - toradians:
  - appendtolinear:
  - autowidth:
inprogress/clock-face.js
  - clock-face:
  - full-time:
inprogress/full-time.js
  - full-timex:

