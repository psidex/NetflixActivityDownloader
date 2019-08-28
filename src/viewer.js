function view() {
    /* Performs some calculations on the flixStats data
     * Inserts the custom HTML into the NetflixStats div
     * Inserts the charts
     */

    // {seriesName: secondsWatched}
    var nameToWatched = {};
    // {dateString: secondsWatched}
    var dateToWatched = {};

    // Populate nameToWatched and dateToWatched
    for (var itemID in flixStats.viewedItems) {
        var item = flixStats.viewedItems[itemID]
        if (item.type == "film") {
            nameToWatched[item.title] = item.duration;
            if (dateToWatched[item.dateWatched]) dateToWatched[item.dateWatched] += item.duration;
            else dateToWatched[item.dateWatched] = item.duration;
        } else {
            nameToWatched[item.title] = 0;
            for (var epID in item.watchedEpisodes) {
                ep = item.watchedEpisodes[epID];
                nameToWatched[item.title] += ep.duration;
                if (dateToWatched[ep.dateWatched]) dateToWatched[ep.dateWatched] += ep.duration;
                else dateToWatched[ep.dateWatched] = ep.duration;
            }
        }
    }

    // Adds up all time values for a time watched total
    var totalSecondsWatched = 0;
    for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property];

    // Calculates the top 5 most watched dates and how many hours
    var top5WatchedDates_Times = [];
    // Sorts an object using values, not sure how it works... https://stackoverflow.com/a/16794116
    var top5WatchedDates = Object.keys(dateToWatched).sort(function (a, b) {
        return dateToWatched[a] - dateToWatched[b]
    });
    // Get biggest 5 and reverse so biggest is first
    top5WatchedDates = top5WatchedDates.slice(-5).reverse();
    for (var index in top5WatchedDates) {
        // Time in hours
        top5WatchedDates_Times.push((dateToWatched[top5WatchedDates[index]]) / 60 / 60);
    }

    // Same as above but top shows
    var top5WatchedShows_Times = [];
    var top5WatchedShows = Object.keys(nameToWatched).sort(function (a, b) {
        return nameToWatched[a] - nameToWatched[b]
    });
    top5WatchedShows = top5WatchedShows.slice(-5).reverse();
    for (var index in top5WatchedShows) {
        top5WatchedShows_Times.push((nameToWatched[top5WatchedShows[index]]) / 60 / 60);
    }

    // Insert HTML
    var NetflixStatsObject = document.getElementById("NetflixStats");

    // Minified, un-minify to read / edit
    NetflixStatsObject.innerHTML = `
    <h1>Netflix Stats for ${flixStats.userDetails.name}</h1>
    <p>
        <sup><a href="https://psidex.github.io/NetflixStats/#notes--faq">FAQ</a></sup>
        <br>
        <br>
        Amount of different films / series viewed: ${Object.keys(flixStats.viewedItems).length}
        <br>
        <br>
        Total time spent watching netflix: ${Math.round(totalSecondsWatched / 60 / 60)} hours</p>
    <br>
    <h2>Most Watched:</h2>
    <div class="chart-container">
        <canvas class="chart-contained" id="top5WatchedShowsChart"></canvas>
    </div>
    <br>
    <h2>Longest time spent watching in a day:</h2>
    <div class="chart-container">
        <canvas class="chart-contained" id="top5WatchedDatesChart"></canvas>
    </div>`;


    /* Charts
     * This deals with drawing the charts
     */

    let top5WatchedShowsChartCTX = document.getElementById("top5WatchedShowsChart").getContext("2d");
    let top5WatchedShowsChart = new Chart(top5WatchedShowsChartCTX, {
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

    let top5WatchedDatesChartCTX = document.getElementById("top5WatchedDatesChart").getContext("2d");
    let top5WatchedDatesChart = new Chart(top5WatchedDatesChartCTX, {
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
}