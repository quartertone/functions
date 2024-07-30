<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <?php
  /*
  $jsfiles = array_merge(
    glob("*.js"),
    glob("inprogress/*.js")
  );
  $cssfiles = array_merge(
    glob("*.css"),
    glob("inprogress/*.css")
  );


  foreach ($jsfiles as $jsfile) {
    echo "<script src='$jsfile'></script>\n";
  }

  foreach ($cssfiles as $cssfile) {
    echo "<link rel='stylesheet' href='$cssfile' />\n";
  }
/* */
  ?>
  <style>
    body {
      background: #222;
      color: #fff;
    }

    grid-cal {
      margin: 2em;
    }
  </style>

  <link rel="stylesheet" href="showmonth.css" />
  <link rel="stylesheet" href="gridcal.css" />
  <link rel="stylesheet" href="promiseprompt.css" />

  <script src="showmonth.js"></script>
  <script src="promiseprompt.js"></script>
  <script src="numtodate_isodate.js"></script>
  <script src="makedimbg.js"></script>
  <script src="gridcalendar.js"></script>
</head>

<body>

  <br />
  <grid-cal data-locale="en" title="CALENDRA" precheck="testcal" reset="true"></grid-cal>
  <br />

  <!-- <input type="checkbox" class="slider" id="ck" />CHECK<br /> -->

  <!-- <div id="out"></div> -->
  <!-- <div id="two"></div> -->

  <clock-face></clock-face>
  <script>
    let gc = document.querySelector("grid-cal");
    let ck = document.querySelector("#ck");

    function testcal(e) {
      // return ck.checked;
      return true;
    }


    // showmonth({
    //   locale: "es",
    //   anchor: document.querySelector("#two"),
    //   precal: 1
    // })
  </script>
</body>

</html>