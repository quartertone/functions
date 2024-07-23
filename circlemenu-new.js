/*
https://codepen.io/quartertone/pen/PooZVKd
by @quartertone

(Based on https://codepen.io/Kapilnemo/pen/gMgLWr )

// APPENDER function only requires data

*/

// - configurable collapsing menu
function floatmenu({ styles = {}, config = {}, menuitems, anchor } = {}) {
  const BUTTONCLASS = "btn";
  //console.log(anchor,config);
  //	anchor.className = "circlemenuinput";
  var TOGGLEID = anchor.id + "toggle";
  anchor.numitems = menuitems.length - 2;



  styles.btnsize ??= getComputedStyle(anchor).getPropertyValue("--btnsize") ?? getComputedStyle(document.documentElement).getPropertyValue("--btnsize") ?? "3em";
  styles.flingdelay ??= 0.1;
  //anchor.direction = config.direction;
  styles.menuspeed ??= 0.5;
  styles.imgsize ??= styles.btnsize;
  styles.lineheight ??= styles.btnsize;
  styles.linearbg ??= "#444e";
  styles.gapsize ??= "0px"; // optional,gap between menu items // "px" or other unit must be given
  styles.menufg ??= "#fff";
  styles.radius ??= "7em";
  styles.leftright ??= "left:0;";
  styles.hovercolor ??= "#589";

  for (let [name, value] of Object.entries(styles)) {
    anchor.style.setProperty('--' + name, value);
  }

  config.ellipse ??= 1;
  config.direction ??= 1; //1 is down/clockwise -1 is up/counterclockwise


  //default rounded to btnsize
  if (config.rounded == false) anchor.style.setProperty('--borderradius', "0");

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
  var vertoffset = config.alignbottom == true ? config.ellipse * Math.sin(toradians(-endangle)) : 0; // vertical offset
  var ellipseXaxis = 1;


  let menustyle = `
	 #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .menuBtn {opacity: 0;}
	
   #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .closeBtn { opacity: 1;}`;
  // switched to just opacity instead. Sliding animation is cheesy
  //transform: translateY(0);
  //transform: translateY(-50px); 

  for (i = 0; i < anchor.numitems; i++) {
    let nth = i + 1;
    menustyle += `
		#${anchor.id} .btn:nth-child(${nth}) {
     top:0em;
		 ${config.style == "rounded" ? "left:0;" : styles.leftright};
			transition-delay: ${i * styles.flingdelay}s;}
			
		#${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn:nth-child(${nth}) {
		`;

    if (config.style == "linear") {
      menustyle += `
			${styles.leftright};
			top: calc( (${config.direction} *( var(--lineheight) + (${styles.lineheight} + ${styles.gapsize}) * ${i})));
			opacity:1;
		}
			`;

    } else { //CIRCULAR MENU
      var thisangle = toradians(startangle - (theta * i));
      if (config.direction == -1) {
        thisangle = toradians(endangle + (theta * i));
      }

      menustyle += `
			left: calc(${styles.radius} * ${ellipseXaxis * Math.cos(thisangle)});
			top: calc(${styles.radius} * ${config.ellipse * (-Math.sin(thisangle)) - vertoffset}); opacity:1;}`;
    }
  }


  addCSS(menustyle, anchor.id + "_circlemenu");



  //menuitems = config.data;

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
    var btn = menuitems.shift();
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

  for (idx in menuitems) {
    // for (let idx = menuitems.length -1; idx >=0; idx--) {
    var btn = menuitems[idx];
    if (btn.hidden == true) continue;
    // var trigger = document.createElement(btn.link ? "a" : "div");
    var trigger = document.createElement("a");
    trigger.classList.add(BUTTONCLASS);
    trigger.id = btn.id;
    trigger.title = btn.alt;
    // this is so that cascading animation shows later items behind the previous menu item
    trigger.style.zIndex = menuitems.length - idx;
    //trigger._target="_blank"; trigger.rel="noopener"; //optional

    if (btn.link != "") {
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

  if (!config.banner) {
    let dimbg;
    chkbox.onchange = function (e) {
      console.log(this.checked);
      if (this.checked) {
        dimbg = makedimbg({ parentbox: anchor, before: chkbox, alsofn: function () { chkbox.checked = false; }, opacity: 0.3, scroll: config.scroll });
      } else if (dimbg) {
        dimbg.click();
      }
    };
  }


  ////////////////////////////////////
  // ADJUST WIDTH FOR LONGEST LABEL //
  ////////////////////////////////////

  function autowidth(anchor) {
    //console.log("--AUTOWIDTH--",anchor.config);
    if (anchor.styles.menuwidth) return;
    anchor.style.setProperty('--menuwidth', "auto");
    let btns = anchor.getElementsByClassName("btn");

    let imgem = getComputedStyle(anchor).getPropertyValue('--imgsize').match(/([\.\d]*)/)[0];
    let imgpx = (btns[1].getElementsByTagName("img")[0].getBoundingClientRect()).width;

    let converter = imgem / imgpx; // convert to EMs


    let widths = [];
    let bannerwidths = [];
    for (i = 0; i < btns.length; i++) {
      // last item (first item, but reversed) is toggler button
      // this will be smaller than the other items so doesn't matter that we take it into account or not
      widths.push(btns[i].getBoundingClientRect().width * converter);
      // console.log(btns[i], widths[i]);
      if (i <= anchor.config.banner) bannerwidths.push(btns[i].getBoundingClientRect().width * converter);
      //console.log(btns[i].id, btns[i].getBoundingClientRect().width * converter);

    }

    anchor.style.setProperty('--menuwidth', (0.5 + Math.max(...widths)) + "em");

    //console.log("menufixedwidth", (0.5 + Math.max(...widths)) + "em");
    if (anchor.config.banner) {
      //console.log(widths, (widths.reduce((a, b) => a + b, 0) + "em"));

      // THIS gives wrong sum because of font size scaling. menu font is 75% of baseline
      // CRAPPY HACK = divide by 75%
      // navheight could be btnsize?
      let bannerstyle = `
  @media only screen and (min-width:${(1 / 0.85) * widths.reduce((a, b) => a + b, 0)}em) {
    main { padding-top: calc(var(--btnsize) + ${anchor.styles.lineheight}) }
    #${anchor.id} label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--btnsize); }
    #${anchor.id} .btn:first-child { display:none; }
    #${anchor.id} .btn:not(:first-child) { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}
  }
`;
      //+ "#${anchor.id} .btn:first-child { right:0 !important; }" //CRAPPY HACK
      if (anchor.config.banner >= 2) {
        bannerstyle += `
      @media only screen and (min-width:${(1 / 0.85) * bannerwidths.reduce((a, b) => a + b, 0)}em) and (max-width:${(1 / 0.85) * widths.reduce((a, b) => a + b, 0)}em) {
        main { padding-top: calc(var(--btnsize) + ${anchor.styles.lineheight}) }
        #${anchor.id} input[type="checkbox"]:not(:checked) ~ label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--btnsize); }
        /* CRAPPY HACK for fixed icon*/
        #${anchor.id} input[type="checkbox"]:not(:checked) ~ label .btn:first-child { position: fixed; top: 0 !important; right:0 !important; }`;

        for (i = 1; i <= anchor.config.banner + 1; i++) {
          bannerstyle += `#${anchor.id} input[type="checkbox"]:not(:checked) ~ label .btn:nth-child(${i}), `;
        }
        bannerstyle += "#comma_terminator_placeholder { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;} }";

      }
      addCSS(bannerstyle, anchor.id + "_maxwidth");
    }
  }

} //END FLOATMENU



// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// REQUIRED FUNCTIONS
// addcss
// makedimbg
// toradians
// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------


//// USAGE EXAMPLE:

// let styles = {
//   flingdelay: 0.1, // animation delay in seconds (for staggered opening)
//   menuspeed: .6, // animation speed /// change name to menuspeed
//   btnsize: "3em", // size of buttons
//   //menuwidth: "16em", // width of menu items, default is auto-calculated
//   imgsize: "3em", // defaults to btnsize, this is the size of the image icons within the linear menu items
//   lineheight: "3em", // defaults to btnsize, line height of the linear menu items
//   menufg: #fff,
//   linearbg: "#449", // bg color of linear menu items
//   gapsize: "2px", // gap between linear menu items
//   radius: "7em", // radius of the circle along which icons are placed
//   leftright: "right:0em;"
// };


// var configuration = {
//   scroll: false, // allow/disable scrolling while menu is open (based on makedimbg)
//   rounded: false, // t/f rounded borders
//   direction: 1, // default 1; 1 = clockwise/down, -1 = counterclockwise/up
//   // this is experimental and needs some work
//   // banner: 3, //banner option: number of items to show horizontally if display is too narrow		
//   style: "linear", // rounded or linear
//   // arc: {auto calculated}, // angle in degrees, default is calculated according to btnsize and radius
//   // startpoint: {auto calculated} // angle in degrees, default is calculated according to arc centered on the zenith
//   // zero is set to the left side of the X axis just because that's how I like it.
//   ellipse: 1, //change this to make the arc narrow(<1) or tall(>1)
//   alignbottom: true, // t/f whether to bring the arc down so the two ends line up with menu opener					
// };

// // DATA is required
// let data = [ //first two items comprise the menu opener (open / close)
//   {
//     "id": "id1",
//     "src": "menuburger.svg",
//     "alt": "MENU"
//   }, {
//     "id": "id2",
//     "src": "menuburger.svg",
//     "alt": "CLOSE"
//   }, {
//     "id": "id3",
//     "src": "https://upload.wikimedia.org/wikipedia/commons/5/5e/%C3%86toms_-_Earth.svg",
//     "alt": "Earth1",
//     "link": ""
//   }, {
//     "id": "id4",
//     "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
//     "alt": "second world",
//     "link": ""
//   }, {
//     "id": "id5",
//     "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
//     "alt": "Other world",
//     "link": ""
//   }, {
//     "id": "id6",
//     "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
//     "alt": "WORDLE",
//     "link": ""
//   }, {
//     "id": "id7",
//     "src": "https://upload.wikimedia.org/wikipedia/commons/4/42/Molniya_earth_view_E.svg",
//     "alt": "Seventh Stage",
//     "link": ""
//   },
// ];


// anchor is required, and must have an ID

// // styles:styles,config:configuration,
// floatmenu({ styles: styles, config: configuration, menuitems: data, anchor: document.querySelector("#btn") });





// DO THIS LATER
// ////////////////////
// // APPEND TO MENU //
// ////////////////////

// function appendtolinear(config, anchor) {
// var TOGGLEID = anchor.id + "toggle";
// var additems = config.data.length;
// var newitemcount = anchor.numitems + additems;


// // TODO : CHANGE TO addCSS

// var style = document.createElement('style');

// for (i = anchor.numitems; i <= (additems + anchor.numitems); i++) {
// var nth = i + 1;
// style.innerHTML +=`
// #${anchor.id} .btn:nth-child(${nth}) {
// top:0;
// ${anchor.styles.leftright};
// transition-delay: ${i * anchor.styles.flingdelay}s;
// }

// #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn:nth-child(${nth}) {
// ${anchor.styles.leftright};
// top: calc( (${anchor.config.direction} * ( var(--lineheight) + (${anchor.styles.lineheight} + ${anchor.styles.gapsize}) * ${i})));
// opacity:1;
// }
// `;

// // if negative direction, use lineheight???

// }

// document.head.appendChild(style);



// menuitems = config.data;

// var menulabel = document.getElementById(anchor.id + "_menulabel");

// for (idx in menuitems) {
// let btn = menuitems[idx];
// let trigger = document.createElement("a");
// trigger.classList.add(BUTTONCLASS);
// trigger.id = btn.id;
// trigger.title = btn.alt;
// //trigger._target="_blank"; trigger.rel="noopener"; //optional

// // if (btn.link != "") trigger.href = btn.link;
// if (btn.link != "") {
// let btnlink = btn.link;
// trigger.onclick = function (e) {
// window.location.assign(btnlink);
// };
// }

// var img = document.createElement("img");
// //img.id = "img_" + btn.id;
// img.alt = btn.alt;
// img.src = btn.src;
// trigger.insertBefore(img, null);
// var span = document.createElement("span");
// span.innerHTML = btn.alt;
// trigger.insertBefore(span, null);
// menulabel.insertBefore(trigger, null);
// }

// //	anchor.insertBefore(menulabel, null); // no need, it's already there.
// anchor.numitems += config.data.length;

// // this is linear menu, so don't need (if)
// autowidth(anchor);

// } //END APPEND


