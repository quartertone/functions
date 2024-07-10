

var locale = "en";


function showmonth({ refdate, precal = 0, postcal = 0, anchor, classes = "" } = {}) {
  anchor.innerHTML = "";
  anchor.classList.add("calholder");

  let monthrow = document.createElement("div");
  monthrow.className = "monthrow " + classes;

  anchor.append(monthrow);


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


    let wayback = document.createElement("button");
    wayback.innerText = "<<";
    wayback.id = "wayback";

    let navback = document.createElement("button");
    navback.innerText = "<";
    navback.id = "navback";

    let navcal = document.createElement("div");
    navcal.id = "navcal";

    let navfwd = document.createElement("button");
    navfwd.innerText = ">";
    navfwd.id = "navfwd";

    let wayfwd = document.createElement("button");
    wayfwd.innerText = ">>";
    wayfwd.id = "wayfwd";


    navigator.append(wayback, navback, navcal, navfwd, wayfwd);
    monthrow.innerHTML = "";
    monthrow.append(navigator);


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
          });
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
      monthblock.dataset.month = m.toLocaleString('default', { month: 'long' }) + " (" + m.getFullYear() + ")";
      monthrow.append(monthblock);

      for (let daylabel of "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")) {
        let dayhead = document.createElement("div");
        dayhead.className = "dayhead";
        dayhead.innerText = daylabel.substring(0, 3);
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

      monthblock.onclick = function (e) {
        if (e.target.classList.contains("day")) {
          if (e.target.classList.contains("calfade")) {
            // toasty("faded");
            // date from other month
            console.log("faded");
            putmonths({ refdate: e.target.dataset.date });

          } else {
            console.log("clicked day", e.target.dataset.date);



          }
        };
      };

    }
  }


  function gridmonth(initdate = null, parentcal = null) {

    var monthbox = document.createElement("div");
    monthbox.className = "floatingcalbox";
    parentcal.appendChild(monthbox);

    // monthbox.style.transition = "opacity var(--fadespeed) ease";
    // monthbox.style.opacity = "0";

    //Create dimmer BG
    // makedimbg({ source: monthbox, parentbox: parentcal }); // SET BG LISTENER

    makemonthgrid(initdate);


    function makemonthgrid(caldate = null) {
      //caldate sanity check
      caldate = numtodate(caldate);
      let thismonth = caldate.toLocateDateString(locale, { month: "short" });

      var outText = '<div class="floatingmonth">';
      for (let month = 0; month < 12; month++) {
        var active = "";
        let thisboxdate = moment(caldate).month(month);
        let thisboxmonth = thisboxdate.toLocateDateString(locale, { month: "short" }); //.format("MMM");
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

