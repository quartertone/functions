<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Readme</title>
</head>

<body>
  <pre>
# Collection of Javascript functions
### (Mostly useful, some superfluous)

<?php

$jsfiles = array_merge(
  glob("*.js"),
  glob("inprogress/*.js")
);
$cssfiles = array_merge(
  glob("*.css"),
  glob("inprogress/*.css")
);


foreach ($jsfiles as $file) {
  echo "\n$file\n";
  $fh = fopen($file, 'r');
  $comments = "";
  while ($line = fgets($fh)) {
    if (
      preg_match("/^(async )?function (.*?\(.*\))/", $line, $match)
      || preg_match("/^(var) (\w*?) ?=.*function/", $line, $match)
      || preg_match("/^(customElements.define\(\")(.*?)\"/", $line, $match)

    ) {
      $comments = "  $match[2]"
      . ($match[1]=="async " ? ".then(...": "")
      . ":\n$comments";
      echo $comments;
      $comments = "";
    } else if (preg_match("/^\/\/ - (.*)$/", $line, $match)) {
      // print_r($match);
      // var_dump($comments);
      $comments .= "    - $match[1]\n";
    }
  }
  fclose($fh);
}

?>
</pre>

</body>

</html>