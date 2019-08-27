/* Charts.js
 * This deals with drawing the charts
*/

var top5WatchedShowsChartCTX = document.getElementById("top5WatchedShowsChart").getContext("2d");
var top5WatchedShowsChart = new Chart(top5WatchedShowsChartCTX, {
    type: "bar",
    data: {
        labels: top5WatchedShows,
        datasets: [{
            label: "# of hours watched",
            data: top5WatchedShows_Times,
            backgroundColor: "rgba(299,9,20,0.2)",
            borderColor: "rgba(299,9,20,0.8)",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

var top5WatchedDatesChartCTX = document.getElementById("top5WatchedDatesChart").getContext("2d");
var top5WatchedDatesChart = new Chart(top5WatchedDatesChartCTX, {
    type: "bar",
    data: {
        labels: top5WatchedDates,
        datasets: [{
            label: "# of hours watched",
            data: top5WatchedDates_Times,
            backgroundColor: "rgba(299,9,20,0.2)",
            borderColor: "rgba(299,9,20,0.8)",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});
