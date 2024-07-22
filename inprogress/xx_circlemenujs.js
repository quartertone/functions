/*
https://codepen.io/quartertone/pen/PooZVKd
by @quartertone

(Based on https://codepen.io/Kapilnemo/pen/gMgLWr )





var configuration = {
  flingdelay: 0.1, // animation delay in seconds (for staggered opening)
  animation: 0.5, // animation speed
  btnsize: "3em", // size of buttons
  rounded: true, // t/f rounded borders
  direction: 1, // default 1; 1 = clockwise/down, -1 = counterclockwise/up
  menuwidth: "8em", // width of menu items
  imgsize: "3em", // defaults to btnsize, this is the size of the image icons within the linear menu items
  lineheight: "3em", // defaults to btnsize, line height of the linear menu items
  linearbg: "#444", // bg color of linear menu items
  gapsize: "2px", // gap between linear menu items
  leftright: "left", // align menu on the left or right side of the icon
  banner: false, // if view width is large enough, display linear menu horizontally
      // this is experimental and needs some work
      //working on partial banner display, where X number of items display in banner.
  style: rounded, // rounded or linear
  arc: {auto calculated}, // angle in degrees, default is calculated according to btnsize and radius
  startpoint: {auto calculated} // angle in degrees, default is calculated according to arc centered on the zenith
          // zero is set to the left side of the X axis just because that's how I like it.
  radius: "7em", // radius of the circle along which icons are placed
  ellipse: 1, //change this to make the arc narrow(<1) or tall(>1)
  alignbottom: false, // t/f whether to bring the arc down so the two ends line up with menu opener					
        	
  // DATA is required
  data: [ //first two items comprise the menu opener (open / close)
    {
      "id": "id1",
      "src": "https://upload.wikimedia.org/wikipedia/commons/b/be/Earth.svg",
      "alt": "MENU"
    }, {
      "id": "id2",
      "src": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Emblem-earth.svg",
      "alt": "CLOSE"
    }, {
      "id": "id3",
      "src": "https://upload.wikimedia.org/wikipedia/commons/5/5e/%C3%86toms_-_Earth.svg",
      "alt": "Earth",
      "link": ""
    }, {
      "id": "id4",
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
      "alt": "World",
      "link": ""
    },
  ]
};


// APPENDER function only requires data


*/

const BUTTONCLASS = "btn";

function floatmenu(config, anchor) {
  //console.log(anchor,config);
  //	anchor.className = "circlemenuinput";
  var TOGGLEID = anchor.id + "toggle";
  anchor.numitems = config.data.length - 2;

  if (config.hasOwnProperty("animation")) {
    anchor.style.setProperty('--circletransition', config.animation); //default 0.5s
  }

  if (config.hasOwnProperty("btnsize")) {
    anchor.style.setProperty('--btnsize', config.btnsize);
  } else if (getComputedStyle(anchor).getPropertyValue("--btnsize")) {
    config.btnsize = getComputedStyle(anchor).getPropertyValue("--btnsize");
  } else {
    config.btnsize = getComputedStyle(document.documentElement).getPropertyValue("--btnsize");
  }


  if (config.hasOwnProperty("rounded") && config.rounded == false) { //default rounded to btnsize
    anchor.style.setProperty('--borderradius', "0");
  } else {
    //anchor.style.setProperty('--menuimgmargins', "0");
  }

  if (!config.hasOwnProperty("flingdelay")) {
    config.flingdelay = 0.1;
  }
  //anchor.flingdelay = config.flingdelay;

  if (!config.hasOwnProperty("direction")) {
    config.direction = 1; //1 is down/clockwise -1 is up/counterclockwise
  }
  //anchor.direction = config.direction;


  anchor.style.width = "var(--btnsize)"; // need to set width so that positioning works correctly
  anchor.style.height = "var(--btnsize)";



  //for Linear menu
  if (config.hasOwnProperty("menuwidth")) {
    anchor.style.setProperty('--menuwidth', config.menuwidth); //default 8em
  }


  if (config.hasOwnProperty("banner")) {
    //anchor.banner = config.banner; // variable for banner seting.
    // need way to specify offset/location relative to vertical, direction 
  }


  if (!config.hasOwnProperty("imgsize")) {
    config.imgsize = config.btnsize;
  }
  anchor.style.setProperty('--imgsize', config.imgsize); //default btnsize

  if (!config.hasOwnProperty("lineheight")) {
    config.lineheight = config.btnsize;
  }
  anchor.style.setProperty('--lineheight', config.lineheight);
  anchor.lineheight = config.lineheight;

  if (!config.hasOwnProperty("linearbg")) {
    config.linearbg = "#444";
  }
  anchor.style.setProperty('--linearbg', config.linearbg);

  if (!config.hasOwnProperty("gapsize")) {
    config.gapsize = "2px"; // optional,gap between menu items
  }
  anchor.gapsize = config.gapsize;



  if (!config.hasOwnProperty("leftright")) {
    config.leftright = "left";
  }
  anchor.leftright = config.leftright;


  var leftright;
  switch (config.leftright) {
    case "left":
      leftright = "left:0px";
      break;
    case "right":
      leftright = "right:0px";
      break;
  }


  //for circular menu
  if (!config.hasOwnProperty("radius")) {
    config.radius = "7em";
  }
  anchor.radius = config.radius;

  if (!config.hasOwnProperty("ellipse")) {
    config.ellipse = 1;
  }
  anchor.ellipse = config.ellipse;


  if (!config.hasOwnProperty("arc")) {
    //autocalculate ARC so that each button is equidistant 1/2 btnsize apart
    config.arc = 360 * ((config.btnsize.replace(/\D+/g, '')) * (1.5 * anchor.numitems - 1)) / (Math.PI * 2 * (config.radius.replace(/\D+/g, '')));
    if (config.arc > 360) config.arc = 360; //max full circle
  }


  var startangle = config.hasOwnProperty("startpoint") ? 180 - config.startpoint : 180 - (180 - config.arc) / 2;
  var endangle = startangle - config.arc;
  var theta = (startangle - endangle) / (anchor.numitems - 1);
  if (theta * anchor.numitems > 360) theta = (startangle - endangle) / anchor.numitems; //correction for full circle menu
  var vertoffset = (config.hasOwnProperty("alignbottom") && config.alignbottom == true) ? config.ellipse * Math.sin(toradians(-endangle)) : 0; // vertical offset
  var ellipseXaxis = 1;





  var style = document.createElement('style');
  //style.type = 'text/css';
  style.innerHTML = "#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .menuBtn {transform: translateY(-50px); opacity: 0;}\n" +
    "#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .closeBtn {transform: translateY(0px); opacity: 1;}\n";

  for (i = 0; i < anchor.numitems; i++) {
    var nth = i + 2;
    style.innerHTML += "#" + anchor.id + " .btn:nth-child(" + nth + ") {" +
      "top:0px;" + leftright + ";" +
      "-webkit-transition-delay: " + (i) * config.flingdelay + "s;" +
      "transition-delay: " + (i) * config.flingdelay + "s;}\n\n" +

      "#" + anchor.id + ".circlemenu input#" +
      TOGGLEID + ":checked ~ .show-menu .btn:nth-child(" + nth + ") {\n";

    if (config.style == "linear") {
      var topgap = "top: calc( (" + config.direction + " *( var(--btnsize) + (" + config.lineheight + " + " + config.gapsize + ") * " + i + ")));";
      if (config.direction == -1) {
        topgap = "top: calc( (" + config.direction + " *( var(--lineheight) + (" + config.lineheight + " + " + config.gapsize + ") * " + i + ")));";
      }

      style.innerHTML +=
        leftright + ";" +
        topgap +
        "opacity:1;\n}\n\n";
    } else { //CIRCULAR MENU
      var thisangle = toradians(startangle - (theta * i));
      if (config.direction == -1) {
        thisangle = toradians(endangle + (theta * i));
      }

      style.innerHTML += "left: calc(" + config.radius + " * " +
        ellipseXaxis * Math.cos(thisangle) + ");" +
        "top: calc(" + config.radius + " * " +
        (config.ellipse * (-Math.sin(thisangle)) - vertoffset) +
        "); opacity:1;\n}\n\n";
    }
  }





  ///////////////////// BANNER MENU if SPACE PERMITS //////////
  /*
    if (!config.hasOwnProperty("bannermenu")) {
      config.bannermenu = false;
    }
    anchor.bannermenu = config.bannermenu;

    if (config.style == "linear" && config.bannermenu) {
      let measure = config.menuwidth.match(/\s*([\d]*)\s*([^\s]*)$/);
      let fontsize = getComputedStyle(anchor).getPropertyValue('font-size').match(/\s*([\d]*)\s*([^\s\d]*)$/);
      let widthpx = measure[1] * anchor.numitems * fontsize[1] * 0.75; // MENU labels FONTSIZE is 75%
      style.innerHTML += "@media only screen and (min-width: " + widthpx + "px){\n\n" +
        "#" + anchor.id + ".circlemenu input#" + TOGGLEID +
        " ~ .show-menu .btn .toggleBtn {display:none;}\n\n";

      for (i = 0; i < anchor.numitems; i++) {
        var nth = i + 2;

        style.innerHTML += "#" + anchor.id + " .btn:nth-child(" + nth + ") , " +
          "#" + anchor.id + ".circlemenu input#" +
          TOGGLEID + ":checked ~ .show-menu .btn:nth-child(" + nth + ") {\n";

        var topgap = "top: calc( (" + config.direction + " * var(--btnsize)  ) );";
        if (config.direction == -1) {
          topgap = "top: calc( (" + config.direction + " *( var(--lineheight) + (" + config.lineheight + " + " + config.gapsize + ") * " + i + ")));";
        }

        style.innerHTML +=
          config.leftright + ": calc( var(--menuwidth) * " + i + ");" +
          topgap +
          "opacity:1;\n}\n\n";
      }
      style.innerHTML += "}";

    }
  */

  //FIXME: POTENTIAL PROBLEM: could cause duplicate styles

  document.head.appendChild(style);



  buttonlist = config.data;

  var chkbox = document.createElement("input");
  chkbox.type = "checkbox";
  chkbox.id = TOGGLEID;
  anchor.insertBefore(chkbox, null); //checkbox for CSS toggle action
  anchor.classList.add("circlemenu");
  if (config.style == "linear") anchor.classList.add("linearmenu");

  var menulabel = document.createElement("label");
  menulabel.classList.add("show-menu");
  menulabel.id = anchor.id + "_menulabel";
  menulabel.htmlFor = TOGGLEID;

  //insert first 2 buttons for toggler button
  var togglediv = document.createElement("div");
  togglediv.classList.add(BUTTONCLASS);
  for (i = 0; i < 2; i++) {
    var btn = buttonlist.shift();
    var trigger = document.createElement("div");
    // use div so Lighthouse does not complain about uncrawlable links
    trigger.id = btn.id;
    btn.title = btn.alt;
    //trigger.className = btn.class;
    trigger.classList.add(i == 0 ? "menuBtn" : "closeBtn");
    trigger.classList.add("toggleBtn");
    var img = document.createElement("img");
    //img.id = "img_" + btn.id; //add ID here if you need to reference the image
    img.src = btn.src;
    img.alt = btn.alt;
    trigger.insertBefore(img, null);
    togglediv.insertBefore(trigger, null);
  }
  menulabel.insertBefore(togglediv, null);



  for (idx in buttonlist) {
    var btn = buttonlist[idx];
    if (btn.hidden == true) continue;
    // var trigger = document.createElement(btn.link ? "a" : "div");
    var trigger = document.createElement("a");
    trigger.classList.add(BUTTONCLASS);
    trigger.id = btn.id;
    trigger.title = btn.alt;
    //trigger._target="_blank"; trigger.rel="noopener"; //optional

    // if (btn.link != "") trigger.href = btn.link;
    if (btn.link != "") {
      // let btnlink = btn.link;
      trigger.href = btn.link;
      trigger.onclick = function (e) {
        // ** toggle menu button so menu closes
        document.getElementById(TOGGLEID).checked = false;
        // window.location.assign(btnlink);
      };
    }

    var img = document.createElement("img");
    //img.id = "img_" + btn.id;
    img.alt = btn.alt;
    img.src = btn.src;
    trigger.insertBefore(img, null);
    if (config.style == "linear") {
      var span = document.createElement("span");
      span.innerHTML = btn.alt;
      trigger.insertBefore(span, null);
    }
    menulabel.insertBefore(trigger, null);
  }

  anchor.insertBefore(menulabel, null);

  //anchor.config = JSON.parse(JSON.stringify(config));
  anchor.config = config;

  if (config.style == "linear") autowidth(anchor);


} //END FLOATMENU




//Close menu when clicking outside the menu. Click registers as expected on clicked element
window.addEventListener("mousedown", function (e) {
  let circlemenus = document.getElementsByClassName("circlemenu");
  for (let i = 0; i < circlemenus.length; i++) {
    // iterate for each circle menu
    if (circlemenus[i].getElementsByTagName("input")[0].checked) {
      // this IF says to go with default action (toggle menu or follow menu item)
      // 	  if toggleBtn/btn, or their children, are clicked
      //console.log(e.target);
      if (
        e.target.nodeName == "HTML" ||
        (!(e.target.className).match("toggleBtn|btn") &&
          !((e.target).parentElement.className).match("toggleBtn|btn"))
      ) {
        circlemenus[i].getElementsByTagName("input")[0].checked = false;
      }
    } else { continue; }
  }
});

window.addEventListener("keyup", function (e) {
  let circlemenus = document.getElementsByClassName("circlemenu");
  //		console.log(circlemenus[0]);
  if (e.key == "Escape") {
    for (let i = 0; i < circlemenus.length; i++) {
      circlemenus[i].getElementsByTagName("input")[0].checked = false;
    }
  }
});



////////////////////
// Convert to Rad //
////////////////////
function toradians(degrees) {
  return degrees * Math.PI / 180;
};




////////////////////
// APPEND TO MENU //
////////////////////

function appendtolinear(config, anchor) {
  var TOGGLEID = anchor.id + "toggle";
  var additems = config.data.length;
  var newitemcount = anchor.numitems + additems;
  //console.log(anchor.id, "appended ", newitemcount);
  /*
    config.animation = getComputedStyle(anchor).getPropertyValue("--circletransition");
	
    config.btnsize = getComputedStyle(anchor).getPropertyValue("--btnsize");
	
    config.flingdelay = anchor.config.flingdelay;
	
    config.direction = anchor.config.direction;
	
    config.menuwidth = getComputedStyle(anchor).getPropertyValue("--menuwidth");
	
    config.imgsize = getComputedStyle(anchor).getPropertyValue("--imgsize");
	
    config.lineheight = getComputedStyle(anchor).getPropertyValue("--lineheight");
	
    config.linearbg = getComputedStyle(anchor).getPropertyValue("--linearbg");
	
    config.gapsize = anchor.gapsize;
	
    config.leftright = anchor.leftright;
  */

  var leftright;
  switch (anchor.config.leftright) {
    case "left":
      leftright = "left:0px";
      break;
    case "right":
      leftright = "right:0px";
      break;
  }





  var style = document.createElement('style');
  // style.type = 'text/css';
  //	style.innerHTML = "#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .menuBtn {transform: translateY(-50px); opacity: 0;}\n" +
  //		"#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .closeBtn {transform: translateY(0px); opacity: 1;}\n";

  for (i = anchor.numitems; i <= (additems + anchor.numitems); i++) {
    var nth = i + 2;
    style.innerHTML += "#" + anchor.id + " .btn:nth-child(" + nth + ") {" +
      "top:0px;" + leftright + ";" +
      "-webkit-transition-delay: " + (i) * anchor.config.flingdelay + "s;" +
      "transition-delay: " + (i) * anchor.config.flingdelay + "s;}\n\n" +

      "#" + anchor.id + ".circlemenu input#" +
      TOGGLEID + ":checked ~ .show-menu .btn:nth-child(" + nth + ") {\n";

    //if (config.style == "linear") {
    var topgap = "top: calc( (" + anchor.config.direction + " *( var(--btnsize) + (" + anchor.config.lineheight + " + " + anchor.config.gapsize + ") * " + i + ")));";
    if (anchor.config.direction == -1) {
      topgap = "top: calc( (" + anchor.config.direction + " *( var(--lineheight) + (" + anchor.config.lineheight + " + " + anchor.config.gapsize + ") * " + i + ")));";
    }

    style.innerHTML +=
      leftright + ";" +
      topgap +
      "opacity:1;\n}\n\n";
  }




  // BANNER MENU if SPACE PERMITS
  /*
    if (config.style == "linear" && config.bannermenu) {
      let measure = config.menuwidth.match(/\s*([\d]*)\s*([^\s]*)$/);
      let fontsize = getComputedStyle(anchor).getPropertyValue('font-size').match(/\s*([\d]*)\s*([^\s\d]*)$/);
      let widthpx = measure[1] * anchor.numitems * fontsize[1] * 0.75; // MENU labels FONTSIZE is 75%
      style.innerHTML += "@media only screen and (min-width: " + widthpx + "px){\n\n" +
        "#" + anchor.id + ".circlemenu input#" + TOGGLEID +
        " ~ .show-menu .btn .toggleBtn {display:none;}\n\n";

      for (i = 0; i <= config.append.length; i++) {
        var nth = i + anchor.numitems;

        style.innerHTML += "#" + anchor.id + " .btn:nth-child(" + nth + ") , " +
          "#" + anchor.id + ".circlemenu input#" +
          TOGGLEID + ":checked ~ .show-menu .btn:nth-child(" + nth + ") {\n";

        var topgap = "top: calc( (" + config.direction + " * var(--btnsize)  ) );";
        if (config.direction == -1) {
          topgap = "top: calc( (" + config.direction + " *( var(--lineheight) + (" + config.lineheight + " + " + config.gapsize + ") * " + i + ")));";
        }

        style.innerHTML +=
          config.leftright + ": calc( var(--menuwidth) * " + i + ");" +
          topgap +
          "opacity:1;\n}\n\n";
      }
      style.innerHTML += "}";

    }
  */

  //FIXME: POTENTIAL PROBLEM: could cause duplicate styles
  document.head.appendChild(style);



  buttonlist = config.data;

  var menulabel = document.getElementById(anchor.id + "_menulabel");

  for (idx in buttonlist) {
    let btn = buttonlist[idx];
    let trigger = document.createElement("a");
    trigger.classList.add(BUTTONCLASS);
    trigger.id = btn.id;
    trigger.title = btn.alt;
    //trigger._target="_blank"; trigger.rel="noopener"; //optional

    // if (btn.link != "") trigger.href = btn.link;
    if (btn.link != "") {
      let btnlink = btn.link;
      trigger.onclick = function (e) {
        window.location.assign(btnlink);
      };
    }

    var img = document.createElement("img");
    //img.id = "img_" + btn.id;
    img.alt = btn.alt;
    img.src = btn.src;
    trigger.insertBefore(img, null);
    var span = document.createElement("span");
    span.innerHTML = btn.alt;
    trigger.insertBefore(span, null);
    menulabel.insertBefore(trigger, null);
  }

  //	anchor.insertBefore(menulabel, null); // no need, it's already there.
  anchor.numitems += config.data.length;

  // this is linear menu, so don't need (if)
  autowidth(anchor);

} //END APPEND




////////////////////////////////////
// ADJUST WIDTH FOR LONGEST LABEL //
////////////////////////////////////

function autowidth(anchor) {
  //console.log("--AUTOWIDTH--");
  if (anchor.config.menuwidth) return;
  anchor.style.setProperty('--menuwidth', "auto");
  let btns = anchor.getElementsByClassName("btn");

  let imgem = getComputedStyle(anchor).getPropertyValue('--imgsize').match(/([\.\d]*)/)[0];
  let imgpx = (btns[1].getElementsByTagName("img")[0].getBoundingClientRect()).width;

  let converter = imgem / imgpx; // convert to EMs


  let widths = [];
  let bannerwidths = [];
  for (i = 1; i < btns.length; i++) {
    //start at i=1 == skip first child
    widths.push(btns[i].getBoundingClientRect().width * converter);
    if (i <= anchor.config.banner) bannerwidths.push(btns[i].getBoundingClientRect().width * converter);
    //console.log(btns[i].id, btns[i].getBoundingClientRect().width * converter);

  }

  anchor.style.setProperty('--menuwidth', (0.5 + Math.max(...widths)) + "em");
  //console.log("menufixedwidth", (0.5 + Math.max(...widths)) + "em");
  if (anchor.config.banner) {

    //banner options: number of items to show in banner if too narrow		

    let style = null;
    if (!document.getElementById(anchor.id + "_maxwidth")) {
      style = document.createElement('style');
      // style.type = 'text/css';
      style.id = anchor.id + "_maxwidth";
      document.head.appendChild(style);
    } else {
      style = document.getElementById(anchor.id + "_maxwidth");
    }
    style.innerHTML = "";

    //console.log(widths, (widths.reduce((a, b) => a + b, 0) + "em"));

    // THIS gives wrong sum because of font size scaling. menu font is 75% of baseline
    // CRAPPY HACK = divide by 75%
    style.innerHTML += "\n@media only screen and (min-width:" + ((1 / 0.85) * widths.reduce((a, b) => a + b, 0) + "em") + ") {"
      + "main { padding-top: calc(var(--navheight) + " + anchor.lineheight + ") }"
      + "#" + anchor.id + " label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--navheight); }"
      + "#" + anchor.id + " .btn:first-child { display:none; }"
      //+ "#" + anchor.id + " .btn:first-child { right:0 !important; }" //CRAPPY HACK
      + "#" + anchor.id + " .btn:not(:first-child) { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}" + "}";


    if (anchor.config.banner >= 2) {
      style.innerHTML += "\n@media only screen and (min-width:" + ((1 / 0.85) * bannerwidths.reduce((a, b) => a + b, 0) + "em") + ") and (max-width:" + ((1 / 0.85) * widths.reduce((a, b) => a + b, 0) + "em") + ") {"
        + "main { padding-top: calc(var(--navheight) + " + anchor.lineheight + ") }"
        + "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--navheight); }"

        //CRAPPY HACK for fixed icon
        + "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label .btn:first-child { position: fixed; top: 0 !important; right:0 !important; }";
      for (i = 2; i <= anchor.config.banner + 1; i++) {
        style.innerHTML += "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label .btn:nth-child(" + i + "), ";
      }
      style.innerHTML += "#RANDOMBLAH { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}";

    }




  }
}