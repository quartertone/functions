// get from shiftsquirrel
// mesh with gridcalendar in obwheel



function showmonth({ refdate, range = 0, anchor, startrange, endrange, manager } = {}) {
  anchor.innerHTML = "";
  anchor.classList.add("calholder");


  let monthrow = document.createElement("div");
  monthrow.className = "monthrow";

  let shiftview = document.createElement("div");
  shiftview.id = "shiftview";

  let placeholder1 = document.createElement("div");
  placeholder1.className = "flexholder";
  let placeholder2 = document.createElement("div");
  placeholder2.className = "flexholder";



  anchor.append(placeholder1, monthrow, shiftview, placeholder2);

  let clickeddate; // placeholder for calendar date selection

  putmonths({ refdate, range, startrange, endrange });

  function putmonths({ refdate, range = 0, startrange, endrange } = {}) {


    let firstmonthfirstday, lastmonthlastday;
    let today = numtodate(new Date());

    refdate = refdate ? numtodate(refdate) : today;

    if (startrange) {
      startrange = numtodate(startrange);
      firstmonthfirstday = new Date(startrange.getFullYear(), startrange.getMonth(), 1);

    } else {
      firstmonthfirstday = new Date(refdate.getFullYear(), refdate.getMonth() - range, 1);
    }

    if (endrange) {
      endrange = numtodate(endrange);
      lastmonthlastday = new Date(endrange.getFullYear(), endrange.getMonth() + 1 + range, 0);
    } else {
      lastmonthlastday = new Date(refdate.getFullYear(), refdate.getMonth() + 1 + range, 0);
    }


    // Calendar Navigation bar
    let navigator = document.createElement("div");
    navigator.id = "calnavigator";
    let navback = document.createElement("button");
    navback.innerText = "<";
    navback.id = "navback";
    let navfwd = document.createElement("button");
    navfwd.innerText = ">";
    navfwd.id = "navfwd";
    let navcal = document.createElement("div");
    navcal.id = "navcal";

    navigator.append(navback, navcal, navfwd);
    monthrow.innerHTML = shiftview.innerHTML = "";
    monthrow.append(navigator);

    navback.onclick = () => {
      putmonths({ refdate: new Date(refdate.getFullYear(), refdate.getMonth() - 1), range });
    };

    navfwd.onclick = () => {
      putmonths({ refdate: new Date(refdate.getFullYear(), refdate.getMonth() + 1), range });
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
      monthblock.className = "month";
      monthblock.dataset.month = m.toLocaleString('default', { month: 'long' }) + " (" + m.getFullYear() + ")";
      monthrow.append(monthblock);

      for (let daylabel of "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")) {
        let dayhead = document.createElement("div");
        dayhead.className = "dayhead";
        dayhead.innerText = daylabel.substring(0, 3);
        monthblock.append(dayhead);
      }


      navcal.onclick = function (e) {
        promiseprompt("Enter target date", { defaulttext: isodate(refdate), placeholder: "Use format YYYY-mm-dd" }).then(resp => {
          console.log(resp);
          if (numtodate(resp)) {
            showmonth({ refdate: resp, range: range, anchor: anchor });
          }
        });

      };



      for (let d = blockstart; d <= blockend; d.setDate(d.getDate() + 1)) {
        let dayclass = "day";
        if (d.getMonth() != m.getMonth()) dayclass += " calfade";
        if (isodate(d) == isodate(today)) dayclass += " today";
        if (refdate && isodate(d) == isodate(refdate)) dayclass += " refdate";
        if (startrange && isodate(d) == isodate(startrange)) dayclass += " startrange";
        if (endrange && isodate(d) == isodate(endrange)) dayclass += " endrange";

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
    }
  }


}


