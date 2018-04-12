document.head.innerHTML += `<style>
h1 {
    color: #000;
}
#NetflixStats {
    padding-top: 10px;
    text-align: center;
    position:absolute;
    width:95%;
    opacity:1;
    z-index:1;
    background:RGB(243,243,243);
}
</style>`;

document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"></div>';
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";
var NetflixStatsObject = document.getElementById("NetflixStats");
NetflixStatsObject.innerHTML = `<h1>Netflix Stats for ${flixStats.userDetails.name}</h1>`;
NetflixStatsObject.innerHTML += `<p>Amount of different films / series viewed: ${Object.keys(flixStats.viewedItems).length}</p>`;
