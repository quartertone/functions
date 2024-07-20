/*
https://codepen.io/quartertone/pen/PooZVKd
by @quartertone

(Based on https://codepen.io/Kapilnemo/pen/gMgLWr )

// APPENDER function only requires data

*/





const BUTTONCLASS = "btn";

function floatmenu(styles, config, anchor) {
  //console.log(anchor,config);
  //	anchor.className = "circlemenuinput";
  var TOGGLEID = anchor.id + "toggle";
  anchor.numitems = config.data.length - 2;


  styles.btnsize ??= getComputedStyle(anchor).getPropertyValue("--btnsize") ?? getComputedStyle(document.documentElement).getPropertyValue("--btnsize") ?? "3em";
	styles.flingdelay ??= 0.1;
	styles.direction ??= 1; //1 is down/clockwise -1 is up/counterclockwise
//anchor.direction = config.direction;
	styles.imgsize ??= styles.btnsize;
	styles.lineheight ??= styles.btnsize;
	styles.linearbg ??= "#444";
	styles.gapsize ??= "2px"; // optional,gap between menu items
	styles.radius ??= "7em";
  styles.leftright ??= "left:0px;";
		
for (let [name,value] of Object.entries(styles)) {
    anchor.style.setProperty('--'+name, value);
}

    config.ellipse ??= 1;


  if (config.hasOwnProperty("rounded") && config.rounded == false) { //default rounded to btnsize
    anchor.style.setProperty('--borderradius', "0");
  } else {
    //anchor.style.setProperty('--menuimgmargins', "0");
  }

	// need to set width so that positioning works correctly
  anchor.style.width = "var(--btnsize)"; 
  anchor.style.height = "var(--btnsize)";


	//autocalculate ARC so that each button is equidistant 1/2 btnsize apart
	config.arc ??= 360 * ((styles.btnsize.replace(/\D+/g, '')) * (1.5 * anchor.numitems - 1)) / (Math.PI * 2 * (styles.radius.replace(/\D+/g, '')));
  if (config.arc > 360) config.arc = 360; //max full circle


  var startangle = config.hasOwnProperty("startpoint") ? 180 - config.startpoint : 180 - (180 - config.arc) / 2;
  var endangle = startangle - config.arc;
  var theta = (startangle - endangle) / (anchor.numitems - 1);
  if (theta * anchor.numitems > 360) theta = (startangle - endangle) / anchor.numitems; //correction for full circle menu
  var vertoffset = (config.hasOwnProperty("alignbottom") && config.alignbottom == true) ? config.ellipse * Math.sin(toradians(-endangle)) : 0; // vertical offset
  var ellipseXaxis = 1;




// TODO: CLEAN UP and change to addCSS here also
  var style = document.createElement('style');
  //style.type = 'text/css';
  style.innerHTML = `
	
	#${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .menuBtn {transform: translateY(-50px); opacity: 0;}
	
  #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .closeBtn {transform: translateY(0px); opacity: 1;}
	
	`;
	
	// "#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .menuBtn {transform: translateY(-50px); opacity: 0;}\n" +
    // "#" + anchor.id + ".circlemenu input#" + TOGGLEID + ":checked ~ .show-menu .btn .closeBtn {transform: translateY(0px); opacity: 1;}\n";

  for (i = 0; i < anchor.numitems; i++) {
    var nth = i + 1;
    style.innerHTML += `
		
		#${anchor.id} .btn:nth-child(${nth}) {
     top:0px;
		 ${styles.leftright};
			transition-delay: ${i * styles.flingdelay}s;}
			
	#${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn:nth-child(${nth}) {
		`;
		
		
		
		// "#" + anchor.id + " .btn:nth-child(" + nth + ") {" +
      // "top:0px;" + styles.leftright + ";" +
      // "-webkit-transition-delay: " + (i) * styles.flingdelay + "s;" +
      // "transition-delay: " + (i) * styles.flingdelay + "s;}\n\n" +

      // "#" + anchor.id + ".circlemenu input#" +
      // TOGGLEID + ":checked ~ .show-menu .btn:nth-child(" + nth + ") {\n";

    if (config.style == "linear") {
      // var topgap = "top: calc( (" + config.direction + " *( var(--btnsize) + (" + styles.lineheight + " + " + styles.gapsize + ") * " + i + ")));";
      // if (config.direction == -1) topgap = "top: calc( (" + config.direction + " *( var(--lineheight) + (" + styles.lineheight + " + " + styles.gapsize + ") * " + i + ")));";

      style.innerHTML += `
			${styles.leftright};
			top: calc( (${config.direction} *( var(--btnsize) + (${styles.lineheight} + ${styles.gapsize}) * ${i})));
			opacity:1;
		}
			`;
        // styles.leftright + ";" +
        // topgap +
        // "opacity:1;\n}\n\n";
    } else { //CIRCULAR MENU
      var thisangle = toradians(startangle - (theta * i));
      if (config.direction == -1) {
        thisangle = toradians(endangle + (theta * i));
      }

      style.innerHTML += "left: calc(" + styles.radius + " * " +
        ellipseXaxis * Math.cos(thisangle) + ");" +
        "top: calc(" + styles.radius + " * " +
        (config.ellipse * (-Math.sin(thisangle)) - vertoffset) +
        "); opacity:1;\n}\n\n";
    }
  }

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
	togglediv.classList.add("togglediv");
  for (i = 0; i < 2; i++) {
    var btn = buttonlist.shift();
    var trigger = document.createElement("div");
    // use div so Lighthouse does not complain about uncrawlable links
    trigger.id = btn.id;
    //trigger.className = btn.class;
    trigger.classList.add(i == 0 ? "menuBtn" : "closeBtn");
    trigger.classList.add("toggleBtn");
    var img = document.createElement("img");
    //img.id = "img_" + btn.id; //add ID here if you need to reference the image
    img.src = btn.src;
    img.alt = btn.title = btn.alt;
    trigger.insertBefore(img, null);
    togglediv.insertBefore(trigger, null);
  }



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
	
  menulabel.append(togglediv); // add last so that it sits on top of other menu items
	

  anchor.insertBefore(menulabel, null);

  //anchor.config = JSON.parse(JSON.stringify(config));
	anchor.styles = styles;
  anchor.config = config;

  if (config.style == "linear") autowidth(anchor);


} //END FLOATMENU




// //Close menu when clicking outside the menu. Click registers as expected on clicked element
// window.addEventListener("mousedown", function (e) {
  // let circlemenus = document.getElementsByClassName("circlemenu");
  // for (let i = 0; i < circlemenus.length; i++) {
    // // iterate for each circle menu
    // if (circlemenus[i].getElementsByTagName("input")[0].checked) {
      // // this IF says to go with default action (toggle menu or follow menu item)
      // // 	  if toggleBtn/btn, or their children, are clicked
      // //console.log(e.target);
      // if (
        // e.target.nodeName == "HTML" ||
        // (!(e.target.className).match("toggleBtn|btn") &&
          // !((e.target).parentElement.className).match("toggleBtn|btn"))
      // ) {
        // circlemenus[i].getElementsByTagName("input")[0].checked = false;
      // }
    // } else { continue; }
  // }
// });

// window.addEventListener("keyup", function (e) {
  // let circlemenus = document.getElementsByClassName("circlemenu");
  // //		console.log(circlemenus[0]);
  // if (e.key == "Escape") {
    // for (let i = 0; i < circlemenus.length; i++) {
      // circlemenus[i].getElementsByTagName("input")[0].checked = false;
    // }
  // }
// });



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
  //var leftright;
  // switch (anchor.styles.leftright) {
    // case "left":
      // leftright = "left:0px";
      // break;
    // case "right":
      // leftright = "right:0px";
      // break;
  // }




// TODO : CHANGE TO addCSS

  var style = document.createElement('style');

  for (i = anchor.numitems; i <= (additems + anchor.numitems); i++) {
    var nth = i + 1;
    style.innerHTML +=`
	#${anchor.id} .btn:nth-child(${nth}) {
    top:0px;
		${anchor.styles.leftright};
    transition-delay: ${i * anchor.styles.flingdelay}s;
	}

	#${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn:nth-child(${nth}) {
	${anchor.styles.leftright};
	top: calc( (${anchor.config.direction} * ( var(--lineheight) + (${anchor.styles.lineheight} + ${anchor.styles.gapsize}) * ${i})));
  opacity:1;
	}
`;

// if negative direction, use lineheight???

  }

//  document.head.appendChild(style);



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
  console.log("--AUTOWIDTH--");
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
      + "main { padding-top: calc(var(--navheight) + " + anchor.styles.lineheight + ") }"
      + "#" + anchor.id + " label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--navheight); }"
      + "#" + anchor.id + " .btn:first-child { display:none; }"
      //+ "#" + anchor.id + " .btn:first-child { right:0 !important; }" //CRAPPY HACK
      + "#" + anchor.id + " .btn:not(:first-child) { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}" + "}";


    if (anchor.config.banner >= 2) {
      style.innerHTML += "\n@media only screen and (min-width:" + ((1 / 0.85) * bannerwidths.reduce((a, b) => a + b, 0) + "em") + ") and (max-width:" + ((1 / 0.85) * widths.reduce((a, b) => a + b, 0) + "em") + ") {"
        + "main { padding-top: calc(var(--navheight) + " + anchor.styles.lineheight + ") }"
        + "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--navheight); }"

        //CRAPPY HACK for fixed icon
        + "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label .btn:first-child { position: fixed; top: 0 !important; right:0 !important; }";
      for (i = 1; i <= anchor.config.banner + 1; i++) {
        style.innerHTML += "#" + anchor.id + " input[type=\"checkbox\"]:not(:checked) ~ label .btn:nth-child(" + i + "), ";
      }
      style.innerHTML += "#RANDOMBLAH { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}";

    }

  }
}



// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// REQUIRED FUNCTIONS

function addCSS(css, id, anchor) { // append CSS style element to head
	let styl = document.querySelector(`#${id}`) ?? document.createElement("style");
  styl.innerHTML = css;
  styl.id = id;
  anchor ? anchor.appendChild(styl) : document.head.appendChild(styl);
  return styl;
}


function makedimbg({ source, parentbox, before, onclickfn, fadetime = "0.35s", alsofn } = {}) {
  let dimbox;

  dimbox = document.createElement("div");
  dimbox.style = "position:fixed;inset:0;background:#444b;opacity:0;";
  dimbox.style.transition = `opacity ${fadetime} ease`;

  if (parentbox != null) {
    if (before) {
      parentbox.insertBefore(dimbox,before);
    } else {
    parentbox.appendChild(dimbox);
    }
  } else {
    document.body.appendChild(dimbox);
  }

  // slight delay to let above styles set up first
  setTimeout(function () {
    dimbox.style.opacity = "1";
  }, 5);


  // if onclick function is set, use it instead.
  // NOTE: custom function must also manage the dimbox (eg let dimbg = makedimbg({onclickfn:functionname}); ----> functionname() {dimbg.remove()};
  onclickfn ??= function (e) {
    e.preventDefault();

    // if alsofn is set, do that ALSO
    if (alsofn instanceof Function) alsofn(); 

    // fadeout transition
    // note: without fadeout, it's just dimbox.remove() and source.remove();
    dimbox.style.opacity = "0";
    if (source) {
      source.style.transition = `opacity ${fadetime} ease`;
      source.style.opacity = "0";
    }
    setTimeout(function () {
      dimbox.remove();
      if (source) source.remove();
    }, parseFloat(fadetime.replace(/s$/, "")) * 1100);

    
  };

  dimbox.onclick = dimbox.ontouch = function (e) {
    onclickfn(e);
    window.removeEventListener("wheel", dontscroll);
    window.removeEventListener("keydown", doescape);
  };

  window.addEventListener("keydown", doescape);
  window.addEventListener("wheel", dontscroll, { passive: false });


  function dontscroll(e) {
    e.preventDefault();
    console.log("no scrolling");
  }

  function doescape(e) {
    if (e.key == "Escape") {
      e.preventDefault();
      window.removeEventListener("wheel", dontscroll);
      window.removeEventListener("keydown", doescape);
      onclickfn(e);
    } else if (e.code.match(/^(Arrow|Page|Space)/)) {
      // prevent scrolling the main webpage
      console.log(e.code, "No scrolling while dimbg");
      e.preventDefault();
    }
  }


  return dimbox;
}


// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------


//// USAGE EXAMPLE:

let styles =  {
		flingdelay: 0.01, // animation delay in seconds (for staggered opening)
		menuspeed: 0.5, // animation speed /// change name to menuspeed
		btnsize: "3em", // size of buttons
		menuwidth: "8em", // width of menu items
		imgsize: "3em", // defaults to btnsize, this is the size of the image icons within the linear menu items
		lineheight: "3em", // defaults to btnsize, line height of the linear menu items
		linearbg: "#449", // bg color of linear menu items
		gapsize: "2px", // gap between linear menu items
		radius: "7em", // radius of the circle along which icons are placed
		leftright: "right:0"
	};
	
	
var configuration = {
	  rounded: false, // t/f rounded borders
  direction: 1, // default 1; 1 = clockwise/down, -1 = counterclockwise/up
      // this is experimental and needs some work
      //working on partial banner display, where X number of items display in banner.
  style: "linear", // rounded or linear
  // arc: {auto calculated}, // angle in degrees, default is calculated according to btnsize and radius
  // startpoint: {auto calculated} // angle in degrees, default is calculated according to arc centered on the zenith
          // zero is set to the left side of the X axis just because that's how I like it.
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
      "alt": "Earth1",
      "link": ""
    }, {
      "id": "id4",
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
      "alt": "second world",
      "link": ""
    }, {
      "id": "id5",
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
      "alt": "Other world",
      "link": ""
    }, {
      "id": "id6",
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
      "alt": "WORDLE",
      "link": ""
    }, {
      "id": "id7",
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
      "alt": "Seventh Stage",
      "link": ""
    },
  ]
};

floatmenu(styles,configuration, document.querySelector("#btn"));



