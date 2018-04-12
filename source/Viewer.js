/* Process stats */
// {seriesName: secondsWatched}
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

var totalSecondsWatched = 0;
for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property]; console.log(totalSecondsWatched);
/* END Process stats */



/* Insert HTML */
var NetflixStatsObject = document.getElementById("NetflixStats");
NetflixStatsObject.innerHTML = `<h1>Netflix Stats for ${flixStats.userDetails.name}</h1>`;
NetflixStatsObject.innerHTML += `<p>Amount of different films / series viewed: ${Object.keys(flixStats.viewedItems).length}</p>`;
NetflixStatsObject.innerHTML += `<p>Total time spent watching netflix: ${Math.round(totalSecondsWatched/60/60)} hours</p>`;
NetflixStatsObject.innerHTML += '</br><h2>Top 5 Watched:</h2>';
NetflixStatsObject.innerHTML += '<div class="chart-container"><canvas class="chart-contained" id="topWatchedChart"></canvas></div>';
/* END Insert HTML */



/* Graph Stuff */

// Big thanks to https://stackoverflow.com/a/16794116
var top5Names = Object.keys(nameToWatched).sort(function(a,b){return nameToWatched[a]-nameToWatched[b]});
// Get biggest 5 and reverse so biggest is first
top5Names = top5Names.slice(-5).reverse();

var top5Times = [];
for (var index in top5Names) {
    // Time in mins
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
            backgroundColor: "rgba(299,9,20,0.2)",
            borderColor: "rgba(299,9,20,0.8)",
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
