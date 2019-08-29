function showInfo() {
    /* Inserts the HTML that the user will see that contains all the info 
     * Performs calculations on the flixStats data and displays it in Chart.js charts
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

    // Insert HTML for the stats
    var NetflixStatsObject = document.getElementById("NetflixStats");
    NetflixStatsObject.innerHTML = `
    <h1>Netflix Stats for ${flixStats.userInfo.name}</h1>
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

    // Create and draw all the charts

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

function gatherWatchInfo(currentPage = 0) {
    /* Iterates through all watch history pages and pulls the needed info
     * Populates the global flixStats object
     */

    console.log("Getting page " + currentPage);

    fetch(shaktiHistoryURL + currentPage)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.viewedItems[0] === undefined) {
                console.log("No viewed items in page, finished gathering pages");
            } else {
                // For each item in the data
                for (let i = 0; i < data.viewedItems.length; i++) {
                    let itemData = data.viewedItems[i];

                    // Extract title, ID, and type of series / film

                    // For series `movieID` will be the ID of the individual episode
                    let itemMovieID = itemData.movieID;

                    if (itemData.seriesTitle) {
                        var itemUniqueID = itemData.series;
                        var itemTitle = itemData.seriesTitle
                        var itemType = "series";
                        // Get some details about the episode watched if it is part of a series
                        var episodeData = {
                            "title": itemData.title,
                            "dateWatched": itemData.dateStr,
                            "duration": itemData.duration
                        };
                    } else {
                        var itemUniqueID = itemMovieID;
                        var itemTitle = itemData.videoTitle
                        var itemType = "film";
                    }

                    if (!flixStats.viewedItems[itemUniqueID]) {
                        flixStats.viewedItems[itemUniqueID] = {}
                        flixStats.viewedItems[itemUniqueID].title = itemTitle;
                        flixStats.viewedItems[itemUniqueID].type = itemType;

                        if (itemType == "series") {
                            flixStats.viewedItems[itemUniqueID].watchedEpisodes = {
                                itemMovieID: episodeData
                            };
                        } else {
                            flixStats.viewedItems[itemUniqueID].dateWatched = itemData.dateStr;
                            flixStats.viewedItems[itemUniqueID].duration = itemData.duration;
                        }

                    } else {
                        // Update data - Netflix doesen't track repeated watches of
                        // films, so only series will be changed here
                        flixStats.viewedItems[itemUniqueID].watchedEpisodes[itemMovieID] = episodeData;
                    }
                }

                gatherWatchInfo(currentPage + 1);
            }
        });
}

function changeUI() {
    /* Does several things that happen before loading the data:
     * - Insert custom CSS
     * - Insert loading symbol
     * - Remove the footer (as it gets in the way)
     */
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

    document.getElementsByClassName("bd")[0].innerHTML = `
    <div id="NetflixStats">
        <h1>Gathering Stats</h1>
        <br />
        <img height="100" width="100" src="https://psidex.github.io/NetflixStats/res/loader.gif">
    </div>`;

    document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = "";
}

function loadExternal() {
    /* Load the Chart.js library before doing anything, so that it can be used later
     */
    return new Promise((resolve, reject) => {
        let chartJSScript = document.createElement("script");
        chartJSScript.type = "application/javascript";
        chartJSScript.src = "https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js";
        chartJSScript.onload = () => {
            console.log("Chart.js loaded")
            resolve();
        };
        document.head.appendChild(chartJSScript);
    });
}

function setupNetflixVariables() {
    /* Sets up 2 global variables to be used later, shaktiHistoryURL and flixStats
     */

    // Shakti API stuff
    let flixInfo = window.netflix.reactContext.models.serverDefs.data;
    let userInfo = window.netflix.reactContext.models.userInfo.data;

    // A global variable containing the Shakti API URL for watch history
    window.shaktiHistoryURL = flixInfo.API_ROOT + "/shakti/" + flixInfo.BUILD_IDENTIFIER + "/viewingactivity?authURL=" + userInfo.authURL + "&pg=";

    // A global variable that will contain all gathered info
    window.flixStats = {
        viewedItems: {},
        userInfo: userInfo
    };

    console.log("Using API URL: " + shaktiHistoryURL);
}

function main() {
    loadExternal()
        .then(() => {
            changeUI();
        })
        .then(() => {
            setupNetflixVariables();
        })
        .then(() => {
            // TODO: This only waits for 1 iteration of the recursion before it goes on to the next .then?
            gatherWatchInfo()
        })
        .then(() => {
            console.log("Finished gathering data");
            showInfo();
        });
}

main();