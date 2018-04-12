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

var top5Names = ["empty", "empty", "empty", "empty", "empty"];
var top5Times = [0, 0, 0, 0, 0];

// Returns the smallest number and its index in top5Times
function smallestTop5Time() {
    var min = Number.POSITIVE_INFINITY
    var index = 0;
    for (i = 0; i < top5Times.length; i++) {
        if (Math.min(min, top5Times[i]) == top5Times[i]) {
            min = top5Times[i];
            index = i;
        }
    }
    return {"time": min, "index": index};
}

// For each watched item, calculate the total watch duration, see if it is bigger than
// the lowest value in top5Times. If it is, remove the lower one and push the new one to both arrays
for (var itemID in flixStats.viewedItems) {
    var totalDuration = 0;
    var item = flixStats.viewedItems[itemID]

    if (item.type == "film") totalDuration += item.duration;
    else for (var epID in item.watchedEpisodes) totalDuration += item.watchedEpisodes[epID].duration;

    totalDuration = totalDuration/60  // Convert seconds -> minutes

    var lowestTimeInfo = smallestTop5Time();
    if (totalDuration > lowestTimeInfo.time) {
        top5Times.splice(lowestTimeInfo.index, 1);
        top5Names.splice(lowestTimeInfo.index, 1);
        top5Times.push(totalDuration)
		top5Names.push(item.title)
    }
}

var topWatchedChartctx = document.getElementById("topWatchedChart").getContext("2d");
var topWatchedChart = new Chart(topWatchedChartctx, {
    type: "bar",
    data: {
        labels: top5Names,
        datasets: [{
            label: "# of minutes watched",
            data: top5Times,
            backgroundColor: "rgba(299,9,20,0.2)",
            borderColor: "rgba(299,9,20,0.8)",
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: false
    }
});
