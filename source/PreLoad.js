/*
 * PreLoad.js
 * This is the first script that is run and does a few things:
 * Pre-load the Chart.js library
 * Insert custom CSS
 * Insert & remove some HTML
 * Show a loading symbol
 * Call the next NetflixStats script
*/



// Load the Chart.js library before doing anything, so that it can be used later
// without lag
var script = document.createElement("script");
script.type = "application/javascript";
script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js";
document.getElementsByTagName("head")[0].appendChild(script);



// Insert custom CSS, remove content in page and add loading symbol
document.head.innerHTML += `<style>
h1 {
    color: #000;
}
#NetflixStats {
    padding-top: 10px;
    text-align: center;
    position: absolute;
    width: 95%;
    opacity: 1;
    z-index: 1;
    background: RGB(243,243,243);
}
.chart-container {
    width: 600px;
    height: 300px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}
</style>`;
document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"><h1>Gathering Stats</h1><br/><img height="100" width="100" src="https://thatguywiththatname.github.io/NetflixStats/source/loader.gif"></div>';
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";



// Load next NetflixStats script in chain
var script=document.createElement("script");
script.src="https://thatguywiththatname.github.io/NetflixStats/source/DataGatherer.js";
script.type="application/javascript";
document.getElementsByTagName("head")[0].appendChild(script);
