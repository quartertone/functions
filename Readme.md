# Collection of Javascript functions
### (Mostly useful, some superfluous)


WORKINPROGRESS.js
  tri-check
  drop-down

addcss.js
  addCSS(css, id, anchor)
    - Add css style to document head
    - Returns appended style element
    - css = style document text
    - id = optional ID for style element

arrayequivalent.js
  arrayequivalent(a, b)
    - bidirectional array equiv checker
    - Check if two arrays are equivalent (contain the same elements)

arrayshuffle.js
  ashuffle(array)
    - Shuffle array and return the result

arraystoobj.js
  arraystoobj(keys, values)
    - create object from array of keys and array of values (array.forEach method)
  createObject(keys, values)
    - create object from array of keys and array of values (Object.fromEntries method)

clickit.js
  clickit(element)
    - simulate mousedown/mouseup/click event on an element

clickpoint.js
  clickpoint(x, y)
    - simulate click event on x,y coordinates (in pixels)

downloaddata.js
  downloaddata(data, name, ext, promptText)
    - download given data as a file

dragelement.js
  dragElement(elmnt)
    - make an element draggable

escapehtml.js
  escapeHtml(unsafe)
    - replace selected HTML chars with HTML entities
  encode(string)
    - replaces HTML chars with charcodes

gridcalendar.js
  grid-cal
    - custom element date picker (uses showmonth.js)
    - Resulting date is formatted Y-MM-DD (eg - 2019-05-28)
    - <grid-cal title="Calendar Title"></grid-cal>
    - element.value holds results
    - element.oninput to respond to changes
    - innerHTML is set to title attribute
    - setting element.value="" will also set innerHTML to title again
    - styles set in gridcal.css and showmonth.css
    - Attributes: value = initial date ; data-locale = locale name ; title = initial label ; precheck = name of precheck function ; clickfn = function to use in place of default fn in response to click event ; reset = if true, selecting the same date twice will reset calendar value ""

inputit.js
  inputit(element, newtext, { clobber = false, interval = 100 } = {})
    - INPUT text entry simulator

isbetween.js
  isbetween(num, min, max, equ = true)
    - check if value is between two others
    - default includes endpoints

isloaded_betterwait.js
  isElementLoaded(selector).then(...
    - wait until element is loaded
    - resolve promise when element is loaded (uses requestAnimationFrame)
  betterWait(conditionFunction, { poll = 1000, timeout = 600000, stopper = { stop: false } } = {}).then(...
    - resolve promise when condition becomes true
    - uses setTimeout and polling interval
    - consider switching to [requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)

isontop_getcenter.js
  isontop(el, { ignore } = {})
    - Check if element is on top; requires getcenter()
    - returns [element, centercoordinates]
  getcenter(el)
    - get center coordinates of element
    - getcenter(element) -> returns {x:___, y:___}

loadcss.js
  loadCSS(url, id)
    - load CSSS file into head as link

loadscript.js
  loadScript(url, { vnum, id, defer, async, module, before, anchor } = {})
    - dynamically load JS file

localcookie.js
  localCookie(name, value)
    - set/read/delete "cookie" stored in localstorage

makearray.js
  makearray(start, end)
    - convenience function to create an array of x numbers, or an array with values between x and y

makedimbg.js
  makedimbg({ source, parentbox, before, onclickfn, fadetime = "0.35s", alsofn, opacity = 1, scroll} = {})
    - place translucent screen over everything.
    - click or press Escape to dismiss
    - useful for pulling attention to floating window
    - onclickfn replaces click response
    - alsofn runs in addition to default click response

makediv.js
  makediv(id, { tag = "div", cls = "", inner = "" } = {})
    - convenience fn to create DIV element

numtodate_isodate.js
  numtodate(date)
    - convert string date into Date object
    - date may be Date object, number/string as yyyymmdd, or string as yyyy-mm-dd
  isodate(date)
    - return yyyy-mm-dd format of date object
  datecalc(date, { years, months, days } = {})
    - take Date object (or yyyy-mm-dd) and return new Date object after doing date math
  timenow()
    - return local time
  timediff(a, b)
    - return time difference to the closest hour
    - TODO: make this more generalizable (granularity options)
  mstotime(milliseconds)
    - convert milliseconds to time (H:m:s)
  getwkday(n, locale="default",format="short")
    - get name of weekday in specified locale (or default)

oneshot.js
  oneshot()
    - one-shot function (resettable)
  oneshot2
    - true one-shot (cannot be reset)

pad2start.js
  pad2start(num)
    - convenience function to pad a number with 0s for up to 2 digits

promiseprompt.js
  promiseprompt(promptext, { placeholder = "", defaulttext = "", oktext = "Ok", canceltext = "Cancel", id = "promiseprompt", classes, confirm = false, html = false, okfn = async function () { return true; } } = {}).then(...
    - interactive dialog that resolves to a promise. Requires makedimbg
    - necessary styles in promiseprompt.css 

promisetimeout.js
  promisetimeout(timeout).then(...
    - "sleep" function for use inside async functions
    - promisetimeout(miliseconsd)

randoms.js
  random(seed)
    - seeded pseudo random number generator
    - let rng = random(123456); rng();
  minmax(min, max)
    - get random value between min/max, inclusive
  minmaxexcept(min, max, except)
    - random integer except some number
  randarray(arr,except)
    - rreturn andom array element; optional exclusion parameter

scrollto.js
  scrollto(element)
    - scroll an element into view

showmonth.js
  showmonth({ refdate, precal = 0, postcal = 0, anchor, classes = "", locale = "default", clickfn, title = "" } = {})
    - display interactive calendar
    - option for showing multiple months
    - styles set in showmonth.css
    - parameters: refdate = initial date ; precal/postcal = how many months to show before/after index month ; anchor = base element for calholder ; classes = classname(s) ; locale = language locale, clickfn = function to use in place of default fn in response to click event ; title = calendar title 

spark.js
  spark({x, y}={}, { interval = 1000, anchor = document.body, size = "2em", color = "green" } = {})
    - flash a marker on an element

threestate.js
  threestate(target)
    - three-state slider initialization function
    - assocaited styles in threestate.css

toradians.js
  toradians(degrees)
    - Convert degrees to Radians

inprogress/circlemenu-new.js
  floatmenu({ styles = {}, config = {}, menuitems, anchor } = {})
    - configurable collapsing menu

inprogress/clock-face.js
  clock-face
  full-time

inprogress/full-time.js
  full-timex

