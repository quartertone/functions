# Collection of useful Javascript functions
- addcss.js
  - Add css style to document head
  - Returns appended style element
- arrayequivalent.js
  - Check if two arrays are equivalent (contain the same elements)
- arrayshuffle.js
  - Shuffle array and return the result
- arraystoobj.js
  -  create object from array of keys and array of values
- between.js
  - check if value is between two others
  - default includes endpoints
- clickit.js
  - simulate click event on element
- clickpoint.js
  - simulate click event on x,y coordinates
- downloaddata.js
  - download given data as a file
- dragelement.js
  - make an element draggable
- escapehtml.js
  - replace special HTML chars with HTML entities
  - "encode" function replaces with charcodes
- inputit.js
  - input text entry simulator
- isloaded_betterwait.js
  - isElementLoaded
    - resolve promise when element is loaded (uses requestAnimationFrame)
  - betterWait
    - resolve promise when condition becomes true
    - uses setTimeout and polling interval
    - consider switching to [requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)
- isontop_getcenter.js
  - isontop - check if element is on top (requires getcenter)
  - getcenter - get center coordinates of element
- loadcss.js
  - load CSSS file into head as link
- loadscript.js
  - dynamically load JS file
- localcookie.js
  - set/read/delete "cookie" stored in localstorage
- makearray.js
  - convenience function to create an array of x numbers, or an array with values between x and y
- makediv.js
  - convenience function to create DIV element
- minmax.js
  - get random integer between min/max, inclusive
- mstotime.js
  - convert milliseconds to time (H:m:s)
- oneshot.js
  - one-shot function
  - one version can be "reset"
- pad2start.js
  - convenience function to pad a number with 0s for up to 2 digits
- promiseprompt.js
  - interactive dialog that resolves to a promise
- promiseprompt.css
  - stylesheet for promiseprompt
- promisetimeout.js
  - a "sleep" function for use inside async functions
- scrollto.js
  - scroll an element into view
- seededrandom.js
  - seeded random number generator (simple version)
- spark.js
  - flash a marker on an element
- spark.css
  - stylesheet for spark
- threestate.js
  - three-state slider
- threestate.css
  - stylsheet for three state slider
- timediff.js
  - return time difference to the closest hour
  - TODO: make this more generalizable (granularity options)
- timenow.js
  - return local time
  - (file contains other functions that rely on momentjs. TODO: convert these to vanilla)
- toggleslider.css
  - stylesheet for slider-style checkbox
- WORKINPROGRESS.js
  - ??