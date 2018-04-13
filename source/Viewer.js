/*
 * Viewer.js
 * This is the third and final script, it:
 * Performs some calculations on the flixStats data
 * Inserts custom HTML into the NetflixStats div
 * Draws the charts using the pre-loaded Chart.js library
*/



/* Process stats */

// {seriesName: secondsWatched}
var nameToWatched = {};
// {dateString: secondsWatched}
var dateToWatched = {};

// Populate nameToWatched
for (var itemID in flixStats.viewedItems) {
    var item = flixStats.viewedItems[itemID]
    if (item.type == "film") {
        nameToWatched[item.title] = item.duration;
        if (dateToWatched[item.dateWatched]) dateToWatched[item.dateWatched] += item.duration;
        else dateToWatched[item.dateWatched] = item.duration;
    }
    else {
        nameToWatched[item.title] = 0;
        for (var epID in item.watchedEpisodes) {
            ep = item.watchedEpisodes[epID];
            nameToWatched[item.title] += ep.duration;
            if (dateToWatched[ep.dateWatched]) dateToWatched[ep.dateWatched] += ep.duration;
            else dateToWatched[ep.dateWatched] = ep.duration;
        }
    }
}

var mostWatchedDateTime = -Infinity;
var mostWatchedDate = "unknown";
for (date in dateToWatched) {
    if(dateToWatched[date] > mostWatchedDateTime) {
        mostWatchedDateTime = dateToWatched[date];
        mostWatchedDate = date;
    }
}

var totalSecondsWatched = 0;
for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property];
/* END Process stats */



/* Insert HTML */
var NetflixStatsObject = document.getElementById("NetflixStats");
// This is handled by the build script
NetflixStatsObject.innerHTML = `{NetflixStatsHTML}`;
/* END Insert HTML */



{nextScript}
