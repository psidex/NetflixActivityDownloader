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
NetflixStatsObject.innerHTML += '<canvas id="myChart" width="400" height="400"></canvas>';

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
