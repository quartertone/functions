/*
if title is given, only one month is shown ??? did I do this?
this is to prevent wierdness with buttons
*/
// - display interactive calendar
// - option for showing multiple months
// - styles set in showmonth.css
// - parameters: refdate = initial date ; precal/postcal = how many months to show before/after index month ; anchor = base element for calholder ; classes = classname(s) ; locale = language locale, clickfn = function to use in place of default fn in response to click event ; title = calendar title 

customElements.define("show-month", class ShowMonth extends HTMLElement {






  constructor() {
    super();
    //this.state = 0;
    // this.rotations = ["0deg", "90deg", "180deg", "270deg"];

    // this.value = this._value;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.blockstyle();
  }



  showmonth({ refdate, precal = 0, postcal = 0, anchor, classes = "", locale = "default", clickfn, title = "" } = {}) {


    // anchor.innerHTML = "";
    anchor.classList.add("calholder");


    putmonths({ refdate: refdate });

    function putmonths({ refdate } = {}) {


      let firstmonthfirstday, lastmonthlastday;
      let today = numtodate(new Date());

      refdate = refdate ? numtodate(refdate) : today;


      firstmonthfirstday = new Date(refdate.getFullYear(), refdate.getMonth() - precal, 1);



      lastmonthlastday = new Date(refdate.getFullYear(), refdate.getMonth() + 1 + postcal, 0);


      // Calendar Navigation bar
      let navigator = document.createElement("div");
      navigator.id = "calnavigator";

      let navtitle = document.createElement("div");
      navtitle.innerText = title;
      navtitle.id = "navtitle";

      let navrow = document.createElement("div");
      navrow.innerText = title;
      navrow.id = "navrow";

      let wayback = document.createElement("div");
      wayback.dataset.mark = "<<";
      wayback.id = "wayback";

      let navback = document.createElement("div");
      navback.dataset.mark = "<";
      navback.id = "navback";

      let navcal = document.createElement("div");
      navcal.id = "navcal";
      // navcal.dataset.mark = refdate.getFullYear();

      let navfwd = document.createElement("div");
      navfwd.dataset.mark = ">";
      navfwd.id = "navfwd";

      let wayfwd = document.createElement("div");
      wayfwd.dataset.mark = ">>";
      wayfwd.id = "wayfwd";

      navigator.append(wayback, navback, navcal, navfwd, wayfwd);


      let monthrow = document.createElement("div");
      monthrow.className = "monthrow " + classes;

      anchor.innerHTML = "";
      anchor.append(navigator, monthrow);

      // monthrow.append(navigator);


      navigator.onmousedown =
        navigator.ontouchstart =
        navigator.ontouchmove =
        function (e) {
          if (e.type != "touchstart") e.preventDefault();
        };
      navigator.onclick = function (e) {
        switch (e.target.id) {
          case "wayback":
            putmonths({ refdate: new Date(refdate.getFullYear() - 1, refdate.getMonth()) });
            break;
          case "navback":
            putmonths({ refdate: new Date(refdate.getFullYear(), refdate.getMonth() - 1) });
            break;
          case "navcal":
            promiseprompt("Enter target date", { defaulttext: isodate(refdate), placeholder: "Use format YYYY-mm-dd" }).then(resp => {
              if (resp && numtodate(resp)) {
                putmonths({ refdate: resp });
              }
            }).catch(e => { console.log(e); });
            break;
          case "navfwd":
            putmonths({ refdate: new Date(refdate.getFullYear(), refdate.getMonth() + 1) });
            break;
          case "wayfwd":
            putmonths({ refdate: new Date(refdate.getFullYear() + 1, refdate.getMonth()) });
            break;
        }
      };



      for (let m = new Date(firstmonthfirstday.getFullYear(), firstmonthfirstday.getMonth());
        m <= new Date(lastmonthlastday.getFullYear(), lastmonthlastday.getMonth());
        m.setMonth(m.getMonth() + 1)) {

        let firstday = new Date(m.getFullYear(), m.getMonth(), 1);

        let lastday = new Date(m.getFullYear(), m.getMonth() + 1, 0);

        let blockstart = new Date(m.getFullYear(), m.getMonth(), 1 - firstday.getDay());
        let blockend = new Date(m.getFullYear(), m.getMonth() + 1, 6 - lastday.getDay());

        // console.log(firstday, blockstart, blockend);

        let monthblock = document.createElement("div");
        monthblock.className = "monthblock";

        let monthheading = document.createElement("div");
        monthheading.className = "monthheading";
        monthheading.innerText = m.toLocaleDateString(locale, { month: 'long' }) + " (" + m.getFullYear() + ")";

        monthheading.onclick = () => {
          gridmonth({ refdate: refdate });
        };

        monthblock.append(monthheading);

        monthrow.append(monthblock);

        // for (let daylabel of "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")) {
        for (let d = 0; d <= 6; d++) {
          let dayhead = document.createElement("div");
          dayhead.className = "dayhead";
          dayhead.innerText = getwkday(d, locale);
          //   dayhead.innerText = daylabel.substring(0, 3);
          monthblock.append(dayhead);
        }





        for (let d = blockstart; d <= blockend; d.setDate(d.getDate() + 1)) {
          let dayclass = "day";
          if (d.getMonth() != m.getMonth()) dayclass += " calfade";
          if (isodate(d) == isodate(today)) dayclass += " today";
          if (refdate && isodate(d) == isodate(refdate)) dayclass += " refdate";

          let mday = document.createElement("div");
          mday.className = dayclass;
          mday.dataset.date = isodate(d);
          mday.dataset.day = d.getDate();

          monthblock.append(mday);
        }


        monthblock.onmousedown =
          monthblock.ontouchstart =
          monthblock.ontouchmove =
          function (e) {
            if (e.type != "touchstart") e.preventDefault();
          };

        monthblock.onclick = function (e) {
          if (e.target.classList.contains("day")) {
            if (e.target.classList.contains("calfade")) {
              // go to other month
              putmonths({ refdate: e.target.dataset.date });
            } else {
              console.log("clickfn will process value", e.target.dataset.date);
              if (clickfn instanceof Function) {
                clickfn(e);
              }
              // THIS IS WHERE YOU RETURN THE VALUE
            }
          };
        };

      }


    }


    function gridmonth({ refdate } = {}) {
      refdate = numtodate(refdate);

      var monthbox = document.createElement("div");
      monthbox.className = "floatingcalbox";

      monthbox.style.transition = "opacity 0.5s ease";
      monthbox.style.opacity = "0";


      let monthdim = makedimbg({ source: monthbox, parentbox: anchor, opacity: 0.6 }); // SET BG LISTENER

      makemonthgrid();

      anchor.appendChild(monthbox);
      //Create dimmer BG


      monthbox.onmousedown =
        monthbox.ontouchstart =
        monthbox.ontouchmove =
        function (e) {
          if (e.type != "touchstart") e.preventDefault();
        };
      monthbox.onclick = function (e) {
        if (e.target.classList.contains("gridmonth")) {

          putmonths({ refdate: numtodate(e.target.id) });
          monthdim.click();
        }
      };


      function makemonthgrid() {
        //caldate sanity check
        let thismonth = refdate.toLocaleDateString(locale, { month: "short" });

        var outText = '<div class="floatingmonth">';
        for (let month = 0; month < 12; month++) {
          var active = "";
          let thisboxdate = new Date(refdate);
          thisboxdate.setMonth(month);
          let thisboxmonth = thisboxdate.toLocaleDateString(locale, { month: "short" }); //.format("MMM");
          // let thismm = thisboxdate.format("MM");
          // let thisboxyear = thisboxdate.format("Y");
          // let thisboxday = thisboxdate.format("DD");


          if (thismonth == thisboxmonth) {
            active = " calactive";
          }
          outText += '<div class="gridmonth' + active + '" id="' + isodate(thisboxdate) + '">' + thisboxmonth + '</div>';
          // `${thisboxyear}-${thismm}-${thisboxday}` +

        }
        outText += '</div>';

        monthbox.innerHTML = outText;

        setTimeout(function () {
          monthbox.style.opacity = "1"; // slight delay so animation works
        }, 5);
      }


    }


    // TODO - return promise somewhere when day is clicked

  }


  blockstyle() {
    return `<style>
    :host {
      --blocksize: 2.5em;
      --bordercolor: #88f;
      --oncolor: #fff;
      --offcolor: #000;
      --color: #999;
      position: relative;
      --half: calc(var(--blocksize) / 2);
      --margins: calc(var(--blocksize) /9);
      --rot: 0deg;
      vertical-align: middle;
      width: var(--blocksize);
      height: var(--blocksize);
      display: inline-block;
      margin: var(--margins);
      transform: rotate(var(--rot));
      transition: all 0.5s;
      border: solid 1px var(--bordercolor);
      user-select:none;
    }</style>`;
  }





});