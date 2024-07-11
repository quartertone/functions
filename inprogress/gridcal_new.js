/*
Resulting date is formatted Y-MM-DD (eg - 2019-05-28)

<grid-cal title="Calendar Title"></grid-cal>

divname.value holds results

divname.oninput to respond to changes

innerHTML is set to title attribute

setting divname.value="" will also set innerHTML to title again

*/


customElements.define("grid-cal", class GridCalendar extends HTMLElement {

  set value(val) {
    this._value = val;
    this.setAttribute("value", val);
    // if (!this.dataset.noshow) 
    this.innerHTML = val ? val : this.title; // if noshow is set, don't populate innerHTML with date

    // let newevent = new Event("change");
    // newevent.value = this._value;
    // this.dispatchEvent(newevent);
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();
  }


  connectedCallback() {

    let basethis = this;

    // if (!this.dataset.noshow) 
    this.innerHTML = this.title ? this.title : "_GRIDCAL_";

    let locale = this.dataset.locale ?? "default";

    basethis.initialvalue = this.getAttribute("value");


    function sendinput(value) {
      let newevent = new Event("input");
      newevent.value = value;
      basethis.dispatchEvent(newevent);
    }


    this.onmousedown = this.ontouchstart =
      function (e) {
        // console.log(event);
        var segments = 50; //drag segments = drag sensitivity
        var pageX = e.pageX;
        var totalcount = 0;
        // var touch_slider = 0;
        if (e.targetTouches) pageX = (e.targetTouches[0]).pageX;
        var prevtouchX = Math.floor(pageX * segments / window.innerWidth);
        this.classList.add("active");

        e.preventDefault(); // NEED THIS HERE otherwise the click event gets passed onto the calendar that pops up on top of this == duplicated click event

        this.onmousemove =
          this.ontouchmove = function (e) {
            // event.preventDefault(); // this does not appear to be necessary
            // this is the mechanism for sliding date selector

            var pageX = e.pageX;
            if (e.targetTouches) pageX = (e.targetTouches[0]).pageX;

            var xstep = Math.floor(pageX * segments / window.innerWidth) - prevtouchX;
            prevtouchX = Math.floor(pageX * segments / window.innerWidth);

            if (xstep != 0) {
              basethis.value = isodate(new Date(numtodate(basethis.value).valueOf() + xstep * 86400000));
              sendinput(basethis.value);
              totalcount++;
            }
          };


        this.onmouseout = this.onmouseup = this.ontouchend = function () {
          this.classList.remove("active");
          if (totalcount == 0) {
            // not dragging == basic click
            gridcalendar();
          } else {
            this.blur();
          }
          totalcount = 0;
          this.onmousemove = this.onmouseover =
            this.onmouseup = this.ontouchend = this.onmouseout = null;
        };

      };




    function gridcalendar() {

      var calendarbox = document.createElement("div");
      // if (boxname) calendarbox.id = boxname;
      calendarbox.className = "floatingcalbox"; // for CSS styling
      calendarbox.style.transition = "opacity 0.5s ease";
      calendarbox.style.opacity = "0";

      //Create dimmer BG
      let caldim = makedimbg({ source: calendarbox }); // SET BG LISTENER

      document.body.appendChild(calendarbox);

      showmonth({ refdate: basethis.value??basethis.initialvalue, anchor: calendarbox, classes: "floatingcal", locale: locale, clickfn: clickedfn });


      setTimeout(function () {
        calendarbox.style.opacity = "1"; // slight delay so animation works
      }, 5);



      function clickedfn(e) {
        if (e.target.dataset.date && e.target.classList.contains("day")) {
          // turn off dimmer, and close calendarbox
          // makedimbg({ onoff: false });
          caldim.click();
          // calendarbox.remove();
          //if (debugmode()) console.log("Fulfilling promise");
          basethis.value = e.target.dataset.date;
          sendinput(basethis.value);
        }
      }

    }
  }

});