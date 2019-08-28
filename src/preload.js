// Load the Chart.js library before doing anything, so that it can be used later
let chartJSScript = document.createElement("script");
chartJSScript.type = "application/javascript";
chartJSScript.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js";
document.getElementsByTagName("head")[0].appendChild(chartJSScript);

// Insert custom CSS
document.head.innerHTML += `
<style>
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
    background: RGB(243, 243, 243);
}

.chart-container {
    width: 600px;
    height: 300px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}
</style>`;

// Add loading symbol
document.getElementsByClassName("bd")[0].innerHTML = `
<div id="NetflixStats">
    <h1>Gathering Stats</h1>
    <br />
    <img height="100" width="100" src="https://psidex.github.io/NetflixStats/res/loader.gif">
</div>`;

// Remove the footer as it gets in the way
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";

// Internal API stuff
let flixInfo = window.netflix.reactContext.models.serverDefs.data;
let userInfo = window.netflix.reactContext.models.userInfo.data;

// A global var containing the Shakti API URL for watch history
window.activityURL = flixInfo.API_ROOT + "/shakti/" + flixInfo.BUILD_IDENTIFIER + "/viewingactivity?authURL=" + userInfo.authURL + "&pg=";
console.log("Using API URL: " + activityURL);

// A global var containing all gathered info
window.flixStats = {
    viewedItems: {},
    userDetails: {
        name: userInfo.name,
        guid: userInfo.guid,
        countryOfSignup: userInfo.countryOfSignup,
        currentCountry: userInfo.currentCountry,
        currentRegion: userInfo.currentRegion,
        membershipStatus: userInfo.membershipStatus,
        isInFreeTrial: userInfo.isInFreeTrial,
        isKids: userInfo.isKids
    }
};