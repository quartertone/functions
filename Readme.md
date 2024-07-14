

# Collection of Javascript functions and CSS
### (some useful, some not as useful)

WORKINPROGRESS.js
  - tri-check:
  - drop-down:

addcss.js
  - addCSS:
    - Add css style to document head
    - Returns appended style element
    - css = style document text
    - id = optional ID for style element
    - addCSS(css, [id])

arrayequivalent.js
  - arrayequivalent
    - bidirectional array equiv checker
    - Check if two arrays are equivalent (contain the same elements)
    - arrayequivalent(array1, array2)

arrayshuffle.js
  - ashuffle:
    - Shuffle array and return the result
    - ashuffle(array)

arraystoobj.js
  - arraystoobj:
    - create object from array of keys and array of values (array.forEach method)
    - arraystoobj(keys_array, values_array)
  - createObject:
    - create object from array of keys and array of values (Object.fromEntries method)
    - createObject(keys_array, values_array) 

clickit.js
  - clickit:
    - simulate mousedown/mouseup/click event on an element
    - clickit(element)

clickpoint.js
  - clickpoint:
    - simulate click event on x,y coordinates (in pixels)
    - clickpoint(x,y)

downloaddata.js
  - downloaddata:
    - download given data as a file
    - downloaddata(data_string, filename, extension, promptText)

dragelement.js
  - dragElement:
    - make an element draggable
    - dragElement(element)

escapehtml.js
  - escapeHtml:
    - replace selected HTML chars with HTML entities
    - escapeHtml(string)
  - encode:
    - replaces HTML chars with charcodes
    - encode(string)

gridcalendar.js
  - grid-cal:
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
  - inputit:
    - INPUT text entry simulator
    - inputit(element, newtext, {clobber, interval})

isbetween.js
  - isbetween:
    - check if value is between two others
    - default includes endpoints
    - isbetween(num, min, max, equ = true)

isloaded_betterwait.js
  - isElementLoaded:
    - wait until element is loaded
    - resolve promise when element is loaded (uses requestAnimationFrame)
    - isElementLoaded(selector).then( ...
  - betterWait:
    - resolve promise when condition becomes true
    - uses setTimeout and polling interval
    - consider switching to [requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)
    - betterWait(conditionFunction, {poll, timeout, stopper}).then( ...

isontop_getcenter.js
  - isontop:
    - Check if element is on top; requires getcenter()
    - isontop(element) --> returns [element, centercoordinates]
  - getcenter:
    - get center coordinates of element
    - getcenter(element) -> returns {x:___, y:___}

loadcss.js
  - loadCSS:
    - load CSSS file into head as link
    - loadCSS(url, id)

loadscript.js
  - loadScript:
    - dynamically load JS file
    - loadscript(url, {options}, vnum) -- TODO deconstruct this 

localcookie.js
  - localCookie:
    - set/read/delete "cookie" stored in localstorage
    - localCookie(name, value)

makearray.js
  - makearray:
    - convenience function to create an array of x numbers, or an array with values between x and y
    - makearray(start,end)

makedimbg.js
  - makedimbg:
    - place translucent screen over everything.
    - click or press Escape to dismiss
    - useful for pulling attention to floating window
    - onclickfn replaces click response
    - alsofn runs in addition to default click response
    - makedimbg({source, parentbox, onclickfn, fadetime, alsofn })

makediv.js
  - makediv:
    - convenience fn to create DIV element
    - makediv(id, { tag = "div", cls = "", inner = "" })

numtodate_isodate.js
  - numtodate:
    - convert string date into Date object
    - numtodate([new Date() | 20240522 | "2024-05-22");
  - isodate:
    - return yyyy-mm-dd format of date object
    - isodate([new Date()])
  - datecalc:
    - take Date object (or yyyy-mm-dd) and return new Date object after doing date math
    - datecalc(date, { years, months, days })
  - timenow:
    - return local time
    - timenow()
  - timediff:
    - return time difference to the closest hour
    - TODO: make this more generalizable (granularity options)
    - timediff(timenum1, timenum2)
  - mstotime:
    - convert milliseconds to time (H:m:s)
    - mstotime(milliseconds)
  - getwkday:
    - get name of weekday in specified locale (or default)
    - getwkday(n, [locale, format])

oneshot.js
  - oneshot:
    - one-shot function (resettable)
  - oneshot2:
    - true one-shot (cannot be reset)

pad2start.js
  - pad2start:
    - convenience function to pad a number with 0s for up to 2 digits
    - pad2start(num)

promiseprompt.js
  - promiseprompt:
    - interactive dialog that resolves to a promise. Requires makedimbg
    - necessary styles in promiseprompt.css 

promisetimeout.js
  - promisetimeout:
    - "sleep" function for use inside async functions
    - promisetimeout(miliseconsd)

randoms.js
  - random:
    - seeded pseudo random number generator
    - let rng = random(123456); rng();
  - minmax:
    - get random value between min/max, inclusive
  - minmaxexcept:
    - random integer except some number
  - randarray:
    - rreturn andom array element; optional exclusion parameter

scrollto.js
  - scrollto:
    - scroll an element into view
    - scrollto(element)

showmonth.js
  - showmonth:
    - display interactive calendar
    - option for showing multiple months
    - styles set in showmonth.css
    - showmonth({ refdate, precal, postcal, anchor, classes, locale, clickfn, title })

spark.js
  - spark:
    - flash a marker on an element
    - spark({x,y}, {interval, archor, size, color})

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

