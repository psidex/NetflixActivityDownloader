document.head.innerHTML += `<style>
#NetflixStats {
    text-align: center;
    position:absolute;
    width:95%;
    height:75%;
    opacity:1;
    z-index:100;
    background:#000;
}
</style>`;

document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"></div>';
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";
var NetflixStatsObject = document.getElementById("NetflixStats");
NetflixStatsObject.innerHTML = `
<h1>Netflix Stats</h1>
Hello 
` + flixStats.userDetails.name;
