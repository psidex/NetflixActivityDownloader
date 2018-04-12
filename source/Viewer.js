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

document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"></div>';
document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";
var NetflixStatsObject = document.getElementById("NetflixStats");
NetflixStatsObject.innerHTML = `<h1>Netflix Stats for ${flixStats.userDetails.name}</h1>`;
NetflixStatsObject.innerHTML += `<p>Amount of different films / series viewed: ${Object.keys(flixStats.viewedItems).length}</p>`;
NetflixStatsObject.innerHTML += '</br><h2>Top 5 Watched:</h2>';
NetflixStatsObject.innerHTML += '<div class="chart-container"><canvas class="chart-contained" id="topWatchedChart"></canvas></div>';



/* Process stats */

// {seriesName: minutesWatched}
var nameToWatched = {};

// Populate nameToWatched
for (var itemID in flixStats.viewedItems) {
    var item = flixStats.viewedItems[itemID]
    if (item.type == "film") {
        nameToWatched[item.title] = item.duration;
    } else {
        nameToWatched[item.title] = 0;
        for (var epID in item.watchedEpisodes) {
            ep = item.watchedEpisodes[epID];
            nameToWatched[item.title] += ep.duration;
        }
    }
}

// Big thanks to https://stackoverflow.com/a/16794116
var top5Names = Object.keys(nameToWatched).sort(function(a,b){return nameToWatched[a]-nameToWatched[b]});
// Get biggest 5 and reverse so biggest is first
top5Names = top5Names.slice(-5).reverse();

top5Times = [];
for (var index in top5Names) {
    top5Times.push((nameToWatched[top5Names[index]])/60);
}

var topWatchedChartctx = document.getElementById("topWatchedChart").getContext("2d");
var topWatchedChart = new Chart(topWatchedChartctx, {
    type: "bar",
    data: {
        labels: top5Names,
        datasets: [{
            label: "# of minutes watched",
            data: top5Times,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
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
        },
        responsive:true,
        maintainAspectRatio: false
    }
});
