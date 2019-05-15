/*
 * PreLoad.js
 * This is the first script that is run and does a few things:
 * Pre-load the Chart.js library
 * Insert custom CSS
 * Insert & remove some HTML
 * Show a loading symbol
*/



// Load the Chart.js library before doing anything, so that it can be used later
// without lag
var script = document.createElement("script");
script.type = "application/javascript";
script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js";
document.getElementsByTagName("head")[0].appendChild(script);



// Insert custom CSS, remove content in page and add loading symbol
// The CSS is handled by the build script
document.head.innerHTML += `{injectCSS}`;
document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"><h1>Gathering Stats</h1><br/><img height="100" width="100" src="https://psidex.github.io/NetflixStats/source/images/loader.gif"></div>';
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";



{ nextScript }
