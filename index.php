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

</head>

<body>

  <grid-cal value="2024-05-11" data-noshow="true" data-locale="en" title="CALENDRA"></grid-cal>

  <div id="out"></div>


  <shadow-cal value="2024-05-11" data-noshow="true" data-locale="en" title="CALENDRA"></shadow-cal>


  <script>
    let out = document.querySelector("#out");
    showmonth({ anchor: out, precal: 0 , clickfn:myclickfn})
    // .then(r => {console.log("promise",r)});


    function myclickfn(e) {
      // console.log("e", e);
    }
  </script>
</body>

</html>