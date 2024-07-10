/*
Resulting date is formatted Y-MM-DD (eg - 2019-05-28)

use:
divname.oninput
to retrieve results

<div is="grid-cal" data-noshow="true" title="Calendar Title"></div>
or
<grid-cal data-noshow="true" title="Calendar Title"></grid-cal>

set data-noshow to prevent innerHTML from being automatically populated with title value


*/

let locale = "en";
customElements.define("grid-cal", class GridCalendar extends HTMLElement {

  set value(val) {
    this._value = val;
    if (!this.dataset.noshow) this.innerHTML = val ? val : this.title; // if noshow is set, don't populate innerHTML with date

    // let newevent = new Event("change");
    // newevent.value = this._value;
    // this.dispatchEvent(newevent);
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();

    let basethis = this;


    function sendinput(value) {
      let newevent = new Event("input");
      newevent.value = value;
      basethis.dispatchEvent(newevent);
    }

    ///<div id="lmp_date" class="date_out ob_stuff" title="${words.lmpLong}">&nbsp;</div>
    // <div id="lmp_date" class="date_out ob_stuff" title="Last Menstrual Period">Last Menstrual Period</div>

    let title = this.title ?? "_GRIDCAL_";

    if (!this.dataset.noshow) this.innerHTML = this.title;

    this.onmousedown = this.ontouchstart =
      function (event) {
        // console.log(event);
        var segments = 50; //drag segments = drag sensitivity
        var pageX = event.pageX;
        var totalcount = 0;
        // var touch_slider = 0;
        if (event.targetTouches) pageX = (event.targetTouches[0]).pageX;
        var prevtouchX = Math.floor(pageX * segments / window.innerWidth);
        // var temp = this.style.backgroundColor;
        //this.style.backgroundColor = "#fb0a"; //active scrolling
        this.classList.add("active");

        event.preventDefault(); // NEED THIS HERE otherwise the click event gets passed onto the calendar that pops up == duplicated click event

        this.onmousemove = this.ontouchmove = function (event) {
          // event.preventDefault(); // this does not appear to be necessary


          var pageX = event.pageX;
          if (event.targetTouches) pageX = (event.targetTouches[0]).pageX;

          var xstep = Math.floor(pageX * segments / window.innerWidth) - prevtouchX;
          prevtouchX = Math.floor(pageX * segments / window.innerWidth);

          if (xstep != 0) {
            basethis.value = isodate(new Date(numtodate(basethis.value).valueOf() + xstep * 86400000));
            sendinput(basethis.value);
            totalcount++;
          }
        };

        this.onmouseout = this.onmouseup = this.ontouchend = function (event) {
          this.classList.remove("active");
          if (totalcount == 0) {
            // not dragging
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
      calendarbox.style.transition = "opacity var(--fadespeed) ease";

      document.body.appendChild(calendarbox);
      calendarbox.style.opacity = "0";

      //Create dimmer BG
      makedimbg({ source: calendarbox }); // SET BG LISTENER

      makecal(basethis.value);


      function makecal(caldate = null) {
        caldate = numtodate(caldate??new Date());

        console.log(caldate)
        let firstday = new Date(caldate.getFullYear(), caldate.getMonth(), 1);


        let lastday = new Date(caldate.getFullYear(), caldate.getMonth() + 1, 0);

        let blockstart = new Date(caldate.getFullYear(), caldate.getMonth(), 1 - firstday.getDay());
        let blockend = new Date(caldate.getFullYear(), caldate.getMonth() + 1, 6 - lastday.getDay());


        // Nav buttons
        let floatingnav = document.createElement("div");
        floatingnav.className = "floatingcal";
        floatingnav.innerHTML =`
    <div id="calcaption">${title}<br/>${firstday.getFullYear()}
		<div id="caltodaybtn">&nbsp;</div>
		</div>
		<div class="calbtns" id="calwayback">&lt;&lt;</div>
		<div class="calbtns" id="callittleback">&lt;</div>
		<div class="calbtns" id="calmonthheader">{firstday.format("MMMM")}</div>
		<div class="calbtns" id="callittlefwd">&gt;</div>
		<div class="calbtns" id="calwayfwd">&gt;&gt;</div>`;


        let monthblock = document.createElement("div");
        monthblock.className = "monthblock";
        monthblock.dataset.month = caldate.toLocaleString('default', { month: 'long' }) + " (" + caldate.getFullYear() + ")";
        // monthrow.append(monthblock);
        // document.body.append(monthblock);
        calendarbox.append(floatingnav, monthblock);


        for (let daylabel of "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")) {
          let dayhead = document.createElement("div");
          dayhead.className = "dayhead";
          dayhead.innerText = daylabel.substring(0, 3);
          monthblock.append(dayhead);
        }

        for (let d = blockstart; d <= blockend; d.setDate(d.getDate() + 1)) {
          let dayclass = "day";
          if (d.getMonth() != caldate.getMonth()) dayclass += " calfade";
          if (isodate(d) == isodate(new Date())) dayclass += " today";
          // if (refdate && isodate(d) == isodate(refdate)) dayclass += " refdate";
          // if (startrange && isodate(d) == isodate(startrange)) dayclass += " startrange";
          // if (endrange && isodate(d) == isodate(endrange)) dayclass += " endrange";

          let mday = document.createElement("div");
          mday.className = dayclass;
          mday.dataset.date = isodate(d);
          mday.dataset.day = d.getDate();

          mday.onclick = function () {
            // if (showslots.checked) {
            if (this.classList.contains("calfade")) {
              // toasty("faded");
              console.log("faded");
              showmonth({ refdate: this.dataset.date, range: range, startrange: startrange, endrange: endrange, anchor: anchor });

            } else {
              console.log("active day", this.dataset.date);
            }
          };
          monthblock.append(mday);
        }


        // for (let cell = 0; cell <= 40; cell++) {
        //   if (cell < firstdaynum) {
        //     outText += "<div></div>";

        //   } else {
        //     let activeday = "";
        //     let isodate = firstday.format("Y-MM-") + (new String(++d)).padStart(2, "0");
        //     if (isodate == caldate.format("Y-MM-DD")) {
        //       activeday = "calactive";
        //     } else {
        //       activeday = "";
        //     }
        //     let istoday = isodate == datefromUTC(localDate()) ? "istoday" : "";
        //     outText += `<div class="calday ${activeday} ${istoday}" id="${isodate}">${d}</div>`;
        //     if (d == maxdaycount) break;
        //   }
        // }

        // outText += '</div>';// + '<input type="button" id="calcancel" value="Cancel">';

        // calendarbox.innerHTML = outText;



        setTimeout(function () {
          calendarbox.style.opacity = "1"; // slight delay so animation works
        }, 5);

        calendarbox.onclick = function (e) {
          e.preventDefault();
          switch (e.target.id) {
            case "calwayback":
              makecal(datecalc(caldate, {years: -1}));

              break;
            case "callittleback":
              makecal(datecalc(caldate, {months: -1}));

              break;
            case "callittlefwd":
              makecal(datecalc(caldate, {months: 1}));
              break;
            case "calwayfwd":
              makecal(datecalc(caldate, {years: 1}));
              break;
            case "calcancel":
              calendarbox.remove();
              makedimbg({ onoff: false }); // remove dimmer BG (cancel calendar)
              break;
            case "calcaption":
              // let newday = prompt("Enter date", caldate.format("YYYY-MM-DD"));
              // makecal(moment(newday));
              promiseprompt("Enter date", { defaulttext: isodate(caldate) }).then((newday) => {
                if (newday) makecal(newday);
              });
              break;
            case "caltodaybtn":
              makecal(isodate());
              break;
            case "calmonthheader":
              gridmonth(caldate, calendarbox)
                .then(function (result) {
                  makecal(result);
                });
              break;
            default:
              break;
          }
        };
      }

      // return new Promise(function (resolve, reject) {
      calendarbox.onmousedown =
        calendarbox.ontouchstart =
        calendarbox.ontouchmove =
        function (e) {
          if (e.type != "touchstart") e.preventDefault();
        };
      calendarbox.addEventListener("click", function (e) {
        // add listener is ok here bc this is created once per calendar popup
        e.preventDefault();
        if (e.target.id && e.target.classList.contains("calday")) {
          // turn off dimmer, and close calendarbox
          makedimbg({ onoff: false });
          calendarbox.remove();
          //if (debugmode()) console.log("Fulfilling promise");
          basethis.value = e.target.id;
          sendinput(basethis.value);
        }
      });
      // });
    }




    function gridmonth(initdate = null, parentcal = null) {

      var monthbox = document.createElement("div");
      monthbox.className = "floatingcalbox";

      monthbox.style.transition = "opacity var(--fadespeed) ease";

      parentcal.appendChild(monthbox);
      monthbox.style.opacity = "0";

      //Create dimmer BG
      makedimbg({ source: monthbox, parentbox: parentcal }); // SET BG LISTENER

      makemonthgrid(initdate);


      function makemonthgrid(caldate = null) {
        //caldate sanity check
        caldate = numtodate(caldate); 
        let thismonth = caldate.toLocateDateString(locale,{month:"short"});
        
        var outText = '<div class="floatingmonth">';
        for (let month = 0; month < 12; month++) {
          var active = "";
          let thisboxdate = moment(caldate).month(month);
          let thisboxmonth = thisboxdate.toLocateDateString(locale,{month:"short"}); //.format("MMM");
          // let thismm = thisboxdate.format("MM");
          // let thisboxyear = thisboxdate.format("Y");
          // let thisboxday = thisboxdate.format("DD");


          if (thismonth == thisboxmonth) {
            active = " calactive";
          }
          outText += '<div class="gridmonth' + active + '" id="' + isodate(thisboxdate) +  '">' + thisboxmonth + '</div>';
          // `${thisboxyear}-${thismm}-${thisboxday}` +

        }
        outText += '</div>';

        monthbox.innerHTML = outText;

        setTimeout(function () {
          monthbox.style.opacity = "1"; // slight delay so animation works
        }, 5);
      }

      return new Promise(function (resolve, reject) {
        monthbox.onmousedown =
          // monthbox.ontouchstart =
          function (e) {
            e.preventDefault();
          };
        monthbox.onclick = function (e) {
          // add listener is ok here bc this is created once per calendar popup
          e.preventDefault();
          if (e.target.id && e.target.classList.contains("gridmonth")) {
            // turn off dimmer, and close monthbox
            // caldimbg(dimboxM, false); is not necessary because *this* dimbox
            // is a child of the floating calendar, which is replaced
            // when new month is selected
            monthbox.remove();
            resolve(e.target.id);
          }
        };
      });
    }



  }


  connectedCallback() {
    // console.log("callabac");
  }

});