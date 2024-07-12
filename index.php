<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <?php

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

  ?>
  <style>
    grid-cal {
      margin: 2em;
    }
  </style>
</head>

<body>

  <br />
  <grid-cal value="2024-05-11" data-locale="en" title="CALENDRA" precheck="testcal"></grid-cal>
  <br />

  <input type="checkbox" class="slider" id="ck" />CHECK<br />

  <div id="out"></div>
  <div id="two"></div>


  <script>
    let gc = document.querySelector("grid-cal");
    let ck = document.querySelector("#ck");

    function testcal(e) {
      console.log("boohay");
      return ck.checked;
    }
    
    showmonth({
      anchor: document.querySelector("#out"),
      precal: 0
    })


    showmonth({
      locale: "es",
      anchor: document.querySelector("#two"),
      precal: 1
    })
  </script>
</body>

</html>