// https://luncheon.github.io/clocklet/demo.html


// CUSTOM COMPONENT CLOCK FACE Time inputter
customElements.define("clock-face", class ClockFace extends HTMLElement {


  set value(val) {
    if (val == "") {
      this.querySelector(".digihr").innerText = "--";
      this.querySelector(".digimin").innerText = "--";
    }
    // else if (val.match(/:/)) {
    // let [h,m] = val.split(":");
    // this.querySelector(".digihr").innerText = h;
    // this.querySelector(".digimin").innerText = m;
    this._value = val;
    let newevent = new Event("input");
    newevent.value = this._value;
    this.dispatchEvent(newevent);
    // }
  }
  // designated clock value is assigned to clock-face element

  get value() {
    return this._value;
  }

  constructor() {
    super();




  }

  connectedCallback() {

    
    let digital = document.createElement("div");
    digital.className = "digital";

    let digihr = document.createElement("span");
    digihr.className = "digihr";
    // digihr.value = !digihr.value ? timenow().h : digihr.value;// = "00";
    // digihr.innerText = !digihr.innerText ? timenow().h : digihr.innerText;
    digihr.innerText = !digihr.innerText ? "--" : digihr.innerText;

    // digihr.innerText = !digihr.value ? timenow().h: digihr.value;// = "00";
    let digimin = document.createElement("span");
    // digimin.type = "number";
    digimin.className = "digimin";
    // digimin.innerText =
    //  digimin.innerText = "00";
    // digimin.innerText = !digimin.innerText ? timenow().m : digimin.innerText;// = "00";
    digimin.innerText = !digimin.innerText ? "--" : digimin.innerText;


    // digihr.setAttribute("contenteditable", true);
    // digimin.setAttribute("contenteditable", true);

    digital.append(digihr, document.createTextNode(":"), digimin);


    this.append(digital);
    // console.log(this);
    this.classList.add("clockface");

    let basethis = this;

    this.onclick = (e) => {
      // console.log(e.target.className);
      //function showcorcle(clockface) {

      // create clock interface using clockface as container
      // this.classList.add("clockface");
      // let corcle = document.querySelector(".corcle");

      let clockdisplayer = document.createElement("div");
      clockdisplayer.className = "clockdisplayer";

      let corcle = document.createElement("a");
      corcle.className = "corcle"; // main clockface container

      let clocktitle = document.createElement("div");
      clocktitle.innerHTML = this.title;
      clocktitle.className = "corcletitle";

      let clocktimeshow = document.createElement("div");
      clocktimeshow.className = "corcletimeshow";

      let facehr = document.createElement("div");
      facehr.className = "face-hr conceal";
      let facemin = document.createElement("div");
      facemin.className = "face-min conceal";
      let hand = document.createElement("div");
      hand.className = "hand";
      // let handdot = document.createElement("div");
      // handdot.className = "handdot";
      // hand.append(handdot);
      corcle.append(facehr, facemin, hand);

      clockdisplayer.append(clocktitle, clocktimeshow, corcle);
      let dimbg = makedimbg({source:clockdisplayer});
      document.body.append(clockdisplayer);
      // document.body.append(corcle);

      let corclestyle = getComputedStyle(corcle);
      let animdelay = 1000; //corclestyle.getPropertyValue("--animspeed").match(/^([\.\d]*)s/)[1] * 1000;

      // start display with hours. Minutes are displayed after hour is selected


      let innerhourradius = 0.27;
      let innerdotscale = 0.8;
      let hrdots = placenumbers({ // place PM hours first, since they are in the smaller circle
        prefix: "hr",
        marks: [...makearray(13, 23), "00"],
        radius: innerhourradius,
        scale: innerdotscale,
      });
      hrdots = placenumbers({
        prefix: "hr",
        marks: makearray(1, 12),
        radius: 0.4,
        scale: 1, //1.15,
        dotarray: hrdots,
      });
      //  placenumbers(prefix, marks, radius, scale, every, dotarray)
      let mindots = placenumbers({
        prefix: "min",
        marks: [...makearray(1, 59), "00"],
        radius: 0.4, //0.44,
        scale: 1, //0.5,
        every: 5,
      });
      mindots = placenumbers({
        prefix: "min",
        supp: "x",
        marks: makearray(1, 60),
        radius: 0.4,
        scale: 0.15, //0.27,
        every: -5,
        dotarray: mindots,
      });


      clocktimeshow.innerHTML = digital.textContent;

      let activeunit = "hr"; // set currently active face for interaction
      // if (e.target.className == "digimin") {
      //   activeunit = "min";
      //   switchto("min");
      // } else {
      switchto("hr");
      // }

      corcle.onmousedown = corcle.ontouchstart = function (e) {
        e.preventDefault();
        let lastxy = {
          x: e.clientX ?? e.targetTouches[0].pageX,
          y: e.clientY ?? e.targetTouches[0].pageY
        }; // grab initial mouse coordinates on mousedown
        // movedot(lastxy);
        processit(false);
        corcle.onmousemove = corcle.ontouchmove = function (e) {
          corcle.classList.add("interactive");
          lastxy = {
            x: e.clientX ?? e.targetTouches[0].pageX,
            y: e.clientY ?? e.targetTouches[0].pageY
          };  // grab mouse coordinates on move
          // movedot(lastxy);
          processit(false); // highlight matching dot as mouse moves
        };

        document.onmouseup = document.ontouchend = (e) => {
          // clear move event listeners on mouseup
          corcle.classList.remove("interactive");
          corcle.onmousemove = corcle.ontouchmove = null;
          document.onmouseup = document.ontouchend = null;
          let founditem = processit(true); // find dot and go to next stage
          movedot(getcenter(founditem));
        };

        function processit(gonext) {
          let foundit;
          // console.log(lastxy);
          if (activeunit == "hr") { // interacting with hour face
            // console.log("lastxy", lastxy);
            foundit = closestdot(hrdots, lastxy, innerhourradius); // locate closest dot to cursor
            // digihr.value = 
            digihr.innerText = foundit.dataset.dotNumber.padStart(2, "0");
            // console.log("procesing HR");
            if (gonext) {
              // basethis.value = digihr.innerText + ":" + digimin.innerText;
              activeunit = "min";
              // console.log("Gonig to MIn next");
              switchto("min");
            }
          } else if (activeunit == "min") { //if (foundit.id.match(/^min/)) {
            // console.log("minxy", lastxy);
            foundit = closestdot(mindots, lastxy);
            digimin.innerText = digimin.innerText = foundit.dataset.dotNumber.padStart(2, "0");
            //console.log(this);
            // switchto("hr");
            // console.log("procesing MIN");

            if (gonext) {
              basethis.value = digihr.innerText + ":" + digimin.innerText;
              activeunit = "hr";
              clockdisplayer.remove();
              dimbg.click();
            }
          }
          clocktimeshow.innerHTML = digital.textContent;
          movedot(getcenter(foundit)); // put movedot here for discrete clicks
          return foundit;
        }


      };

      // digihr.onclick = () => {
      //   console.log("direct to HR");
      // };

      // digimin.onclick = () => {
      //   console.log("direct to MIN");
      //   switchto("min");
      // };

      function switchto(face) {
        if (face == "hr") {
          activeunit = "hr";
          facemin.classList.add("conceal");
          facehr.classList.remove("conceal");
          setTimeout(() => {
            let el = document.getElementById("hr" + digihr.innerText);
            if (el) {
              el.classList.add("active");
              movedot(getcenter(el));
            }
          }, animdelay / 2); // dont need this because hide/display transition is just opacity change
        } else if (face == "min") {
          // console.log("switching to min");
          activeunit = "min";
          facemin.classList.remove("conceal");
          facehr.classList.add("conceal");
          setTimeout(() => {
            let el = document.getElementById("min" + digimin.innerText);
            if (el) {

              el.classList.add("active");
              // console.log(getcenter(el));
              movedot(getcenter(el));
            }
          }, animdelay / 2);
        }
      }

      function closestdot(collection, xy, limit = null) {
        let [angle, clickradius] = getvector(xy);
        let founddot;
        // clickradius is a percentage...
        // limit is fractional radius; convert to percentage
        // adjust limit by adding radius of smaller dots
        // smaller dots are basesize/6 * innerdotscale
        // take half of that for radius
        // relative to basesize, so 1/6 * innerdotscale /2 = radius
        limit = limit ? (limit + innerdotscale / 12) * 100 : null;
        // console.log("findingdot", clickradius, limit);
        for (const [key, val] of Object.entries(collection.dots)) {
          // console.log(key, " ?? ", angle, val);
          let lowerlim = parseFloat(key) - parseFloat(collection.delta);
          let upperlim = parseFloat(key) + parseFloat(collection.delta);
          if (isbetween(angle, lowerlim, upperlim, true)
            || isbetween(angle + Math.PI * 2, lowerlim, upperlim, true)) {
            // if (limit) console.log("limit", limit);
            if (limit && limit < clickradius) { // pick the second one
              founddot = val[1];
            } else {
              // console.log("getting other val", val[0]);
              founddot = val[0];
            }
          } else { } // there is no ELSE state
        }

        for (const activedot of corcle.querySelectorAll(".active")) {
          if (activedot != founddot) activedot.classList.remove("active");
          //console.log("clearing", activedot.id);
        }
        // if (founddot) {
        setTimeout(() => {
          founddot.classList.add("active");
          // miniscule delay to let :active:hover expire
          //movedot(getcenter(founddot), angle);
        }, 1); // really "0" is enough but just in case
        // }
        return founddot;
      }

      function getvector(xy, raw) {
        // get vector relative to center of corcle
        let bounds = corcle.getBoundingClientRect(); // get bounding rect of clock face div
        let offsetx = bounds.width / 2;
        let offsety = bounds.height / 2;
        let x = xy.x - bounds.left - offsetx;
        let y = xy.y - bounds.top - offsety;

        let clickradius = pxtopercent(corclestyle, getradius({
          x: x,
          y: y
        }));
        let angle = Math.atan(y / x);

        if (!raw && x < 0)
          angle += Math.PI;

        return [angle, clickradius];

      }

      function movedot(xy, cursorangle) {
        let [angle, clickradius] = getvector(xy);
        // console.log(angle, clickradius);
        if (cursorangle && Math.abs(angle - cursorangle) > Math.PI) {
          if (cursorangle < angle) {
            //console.log("lessthan", cursorangle, angle);
            angle -= Math.PI * 2;
          } else if (cursorangle > angle) {
            //console.log("morethan", cursorangle, angle);
            angle += Math.PI * 2;
          }

        }

        hand.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
        hand.style.height = `calc(${clickradius}% - ${corclestyle.getPropertyValue("--dotsize")}/4)`;
        return xy;
      }

      //luncheon.github.io/clocklet/demo.html
      function placenumbers({
        prefix, //dot ID prefix
        supp = "", // extra suffix for minx styling
        marks, // array of dot labels
        radius, // radius of dots circle
        scale, // size of dot
        every, // display every this number (if negative, skip every this many entries)
        dotarray, // preexisting array to append to (marks count should be the same so that the calculated angle remains correct)
      } = {}) {
        // let hypote = corclestyle.width.replace(/px$/, "") * radius;
        let hypote = corcle.clientWidth * radius;
        let dotangle = (Math.PI * 2) / marks.length;
        // let thisradius = Math.tan(dotangle / 2) * hypote *1.5 ;

        // console.log(hypote, pxtopercent(corclestyle,hypote), dotangle);

        let dotcollection = {};

        dotcollection.delta = dotangle / 2;
        dotcollection.dots = {};

        let counter = 0;
        for (const dot of marks) {
          counter++;
          if (every > 0 && counter % every)
            continue; // show every "every" if value is positive
          if (every < 0 && !(counter % every))
            continue; // skip every "every" if value is negative

          let thisdot = makediv(`${prefix}${dot.toString().padStart(2, "0")}`, {
            tag: "div",
            cls: `dot ${prefix + supp}`
          });

          // thisdot.setAttribute("dotnumber", dot);
          let thisangle = dotangle * counter - Math.PI / 2;

          // getcenter.x is only valid if corcle size is 50% vw
          // need corcle width /2 getcenter.x, substract
          // need to get relative to top left corner
          // x must be
          // let thisx = Math.cos(thisangle) * hypote + getcenter(corcle).x / 2;
          // let thisy = Math.sin(thisangle) * hypote + getcenter(corcle).x / 2;

          let thisx = Math.cos(thisangle) * hypote + corcle.clientWidth / 2;
          let thisy = Math.sin(thisangle) * hypote + corcle.clientHeight / 2;

          thisdot.dataset.dotNumber = dot;
          thisdot.dataset.dotRadius = hypote;
          // thisdot.dataset.angle = thisangle.toFixed(4);
          thisdot.style = `
          left:${pxtopercent(corclestyle, thisx)}%; 
          top:${pxtopercent(corclestyle, thisy)}%;
          transform:scale(${scale});
          `;
          // corcle.insertBefore(thisdot, hand);


          corcle.querySelector(`.face-${prefix}`).append(thisdot);

          if (dotarray) {
            if (dotarray.dots[thisangle]) {
              dotarray.dots[thisangle].push(thisdot);
            } else {
              // thisis for the inbetween dots IDIOT
              dotarray.dots[thisangle] = [thisdot]; //`${prefix}${dot}`;
            }
          } else {
            dotcollection.dots[thisangle] = [thisdot]; //`${prefix}${dot}`;
          }
        }
        return dotarray ?? dotcollection;
      }

      // https://stackoverflow.com/questions/16154857/how-can-i-get-the-mouse-coordinates-relative-to-a-parent-div-javascript
      function pxtopercent(compstyle, px) {
        // compstyle = getComputedStyle(div)
        let w = compstyle.width.replace(/px$/, "");
        // console.log(`${px} is ${100*px/w} percent of ${w}`);
        return (100 * px) / w;
      }

      // Pythagorean calculation
      function getradius(c) {
        return Math.sqrt(c.x ** 2 + c.y ** 2);
      }

      //}


      // digihr.onfocus = digimin.onfocus = function (e) {
      //   e.target.select();
      // };


      // digihr.oninput = (e) => {
      //   console.log("hours manually changed");
      //   closestdot(hrdots, getcenter(corcle.querySelector("#hr" + digihr.value.toString().padStart(2, "0"))));
      // };

      // digimin.oninput = (e) => {
      //   console.log("minutes manually changed");
      // };

    };

  }
});





customElements.define("full-time", class FullTime extends HTMLElement {

  set value(val) {
    if (val == "") {
      this.querySelector("grid-cal").value = "";
      this.querySelector("clock-face").value = "";
      this.dataset.date = this.dataset.time = "";
    }
    //  else if (val.match(/T/)) {
    //    let [d, t] = val.split("T");
    //    console.log(d, t);
    //    this.querySelector("grid-cal").value = d;
    //    this.querySelector("clock-face").value = t;
    this._value = val;
    let newevent = new Event("input");
    newevent.value = this._value;
    this.dispatchEvent(newevent);
    // }
  }
  // designated clock value is assigned to clock-face element

  get value() {
    return this._value;
  }

  constructor() {
    super();

    this.innerHTML = `
    <grid-cal title="${this.title} Date" class="${this.className}"></grid-cal>
    <clock-face title="${this.title} Time" class="${this.className}"></clock-face>
    `;
    // add className to children, then remove from parent/this
    this.className = ""; //

    // IF full-time is defined in the same file, can't do dynamic insertion. Whatever. using queryselector workaround works

    // let gridcal = document.createElement("grid-cal");
    // gridcal.title = this.title;
    // let clockface = document.createElement("clock-face");
    // this.append(gridcal,clockface);

    let gridcal = this.querySelector("grid-cal");
    let clockface = this.querySelector("clock-face");

    let basethis = this;



    gridcal.oninput = function (e) {
      basethis.dataset.date = e.value;
      gridcal.innerHTML = formatDate(e.value);
      checkdata();
      if (!basethis.dataset.time) {
        clockface.querySelector(".digihr").click();
        // clickit(clockface);
      }
    };

    clockface.oninput = function (e) {
      basethis.dataset.time = e.value;
      checkdata();
    };

    function checkdata() {
      if (basethis.dataset.date && basethis.dataset.time) {
        basethis._value = basethis.dataset.date + "T" + basethis.dataset.time;
        // console.log(basethis._value, basethis.dataset.date, basethis.dataset.time);
        basethis.valueAsNumber = new Date(basethis._value).getTime();
        basethis.value = basethis._value; // not sure why this is needed but the other way doesn't work.
      }
    }


  }

  connectedCallback() {


  }
});
