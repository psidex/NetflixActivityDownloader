// Sorts an object using values, not sure how it works... https://stackoverflow.com/a/16794116
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
