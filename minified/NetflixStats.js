var script = document.createElement("script"); script.type = "application/javascript"; script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"; document.getElementsByTagName("head")[0].appendChild(script); document.head.innerHTML += `<style>h1{color:#000}#NetflixStats{padding-top:10px;text-align:center;position:absolute;width:95%;opacity:1;z-index:1;background:RGB(243,243,243)}.chart-container{width:600px;height:300px;text-align:center;margin-left:auto;margin-right:auto}</style>`; document.getElementsByClassName("bd")[0].innerHTML = '<div id="NetflixStats"><h1>Gathering Stats</h1><br/><img height="100" width="100" src="https://psidex.github.io/NetflixStats/source/images/loader.gif"></div>'; document.getElementsByClassName("site-footer-wrapper")[0].innerHTML = ""; function getJSON(url, callback) {
    var xmlhttp = new XMLHttpRequest(); xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try { var data = JSON.parse(xmlhttp.responseText); } catch (err) { alert("Netflix Stats gathering failed, see console for details"); console.warn(err.message + " in " + xmlhttp.responseText); return; }
            callback(data);
        }
    }; xmlhttp.open("GET", url, true); xmlhttp.send();
}
var flixInfo = window.netflix.reactContext.models.serverDefs.data; var userInfo = window.netflix.reactContext.models.userInfo.data; var activityURL = flixInfo.SHAKTI_API_ROOT + "/" + flixInfo.BUILD_IDENTIFIER + "/viewingactivity?" + "authURL=" + userInfo.authURL + "&pgSize=100" + "&pg="; console.log("using URL: " + activityURL); var flixStats = { viewedItems: {}, userDetails: { name: userInfo.name, guid: userInfo.guid, countryOfSignup: userInfo.countryOfSignup, currentCountry: userInfo.currentCountry, currentRegion: userInfo.currentRegion, membershipStatus: userInfo.membershipStatus, isInFreeTrial: userInfo.isInFreeTrial, isKids: userInfo.isKids } }; var pageCount = 0; function gatherWatchInfo(callback) {
    console.log("Getting page " + pageCount); getJSON(activityURL + pageCount, (data) => {
        if (data.viewedItems[0] === undefined) { console.log("No viewed items in page\nFinished gathering pages"); callback(); } else {
            for (var i = 0; i < data.viewedItems.length; i++) {
                var episodeData = data.viewedItems[i]; var generalTitle = "unknown"; var generalType = "series"; var generalID; if (episodeData.seriesTitle) {
                    generalTitle = episodeData.seriesTitle
                    generalID = episodeData.series;
                } else {
                    generalType = "film"; generalTitle = episodeData.videoTitle
                    generalID = episodeData.movieID;
                }
                if (generalType == "series") { var episodeObj = { "title": episodeData.title, "dateWatched": episodeData.dateStr, "duration": episodeData.duration }; }
                if (!flixStats.viewedItems[generalID]) {
                flixStats.viewedItems[generalID] = {}
                    flixStats.viewedItems[generalID].title = generalTitle; flixStats.viewedItems[generalID].type = generalType; if (generalType == "series") { flixStats.viewedItems[generalID].watchCount = 1; flixStats.viewedItems[generalID].watchedEpisodes = { [episodeData.movieID]: episodeObj }; } else { flixStats.viewedItems[generalID].dateWatched = episodeData.dateStr; flixStats.viewedItems[generalID].duration = episodeData.duration; }
                } else { flixStats.viewedItems[generalID].watchCount++; flixStats.viewedItems[generalID].watchedEpisodes[episodeData.movieID] = episodeObj; }
            }
            pageCount++; gatherWatchInfo(callback);
        }
    });
}
gatherWatchInfo(() => {
    console.log("Done"); console.log(flixStats); var nameToWatched = {}; var dateToWatched = {}; for (var itemID in flixStats.viewedItems) {
        var item = flixStats.viewedItems[itemID]
        if (item.type == "film") { nameToWatched[item.title] = item.duration; if (dateToWatched[item.dateWatched]) dateToWatched[item.dateWatched] += item.duration; else dateToWatched[item.dateWatched] = item.duration; }
        else { nameToWatched[item.title] = 0; for (var epID in item.watchedEpisodes) { ep = item.watchedEpisodes[epID]; nameToWatched[item.title] += ep.duration; if (dateToWatched[ep.dateWatched]) dateToWatched[ep.dateWatched] += ep.duration; else dateToWatched[ep.dateWatched] = ep.duration; } }
    }
    var totalSecondsWatched = 0; for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property]; var top5WatchedDates_Times = []; var top5WatchedDates = Object.keys(dateToWatched).sort(function (a, b) { return dateToWatched[a] - dateToWatched[b] }); top5WatchedDates = top5WatchedDates.slice(-5).reverse(); for (var index in top5WatchedDates) { top5WatchedDates_Times.push((dateToWatched[top5WatchedDates[index]]) / 60 / 60); }
    var top5WatchedShows_Times = []; var top5WatchedShows = Object.keys(nameToWatched).sort(function (a, b) { return nameToWatched[a] - nameToWatched[b] }); top5WatchedShows = top5WatchedShows.slice(-5).reverse(); for (var index in top5WatchedShows) { top5WatchedShows_Times.push((nameToWatched[top5WatchedShows[index]]) / 60 / 60); }
    var NetflixStatsObject = document.getElementById("NetflixStats"); NetflixStatsObject.innerHTML = `<h1>Netflix Stats for ${flixStats.userDetails.name}</h1> <p> <sup><a href=https://psidex.github.io/NetflixStats/#notes--faq>FAQ</a></sup> <br><br> Amount of different films / series viewed: ${Object.keys(flixStats.viewedItems).length} <br><br> Total time spent watching netflix: ${Math.round(totalSecondsWatched / 60 / 60)} hours </p> <br> <h2>Most Watched:</h2> <div class=chart-container> <canvas class=chart-contained id=top5WatchedShowsChart></canvas> </div> <br> <h2>Longest time spent watching in a day:</h2> <div class=chart-container> <canvas class=chart-contained id=top5WatchedDatesChart></canvas> </div> `; var top5WatchedShowsChartCTX = document.getElementById("top5WatchedShowsChart").getContext("2d"); var top5WatchedShowsChart = new Chart(top5WatchedShowsChartCTX, { type: "bar", data: { labels: top5WatchedShows, datasets: [{ label: "# of hours watched", data: top5WatchedShows_Times, backgroundColor: "rgba(299,9,20,0.2)", borderColor: "rgba(299,9,20,0.8)", borderWidth: 1 }] }, options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] }, responsive: true, maintainAspectRatio: false } }); var top5WatchedDatesChartCTX = document.getElementById("top5WatchedDatesChart").getContext("2d"); var top5WatchedDatesChart = new Chart(top5WatchedDatesChartCTX, { type: "bar", data: { labels: top5WatchedDates, datasets: [{ label: "# of hours watched", data: top5WatchedDates_Times, backgroundColor: "rgba(299,9,20,0.2)", borderColor: "rgba(299,9,20,0.8)", borderWidth: 1 }] }, options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] }, responsive: true, maintainAspectRatio: false } });
});