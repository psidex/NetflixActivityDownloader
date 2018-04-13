/*
 * Viewer.js
 * Performs some calculations on the flixStats data
 * Inserts the custom HTML into the NetflixStats div
*/



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

// Calculates the most watched date and how many seconds
var mostWatchedDateTime = -Infinity;
var mostWatchedDate = "unknown";
for (date in dateToWatched) {
    if(dateToWatched[date] > mostWatchedDateTime) {
        mostWatchedDateTime = dateToWatched[date];
        mostWatchedDate = date;
    }
}

// Adds up all time values for a time watched total
var totalSecondsWatched = 0;
for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property];


// Gets the top 5 most watched shows and the time spent watching
var top5Times = [];
// Sorts an object using values, not sure how it works... https://stackoverflow.com/a/16794116
var top5Names = Object.keys(nameToWatched).sort(function(a,b){return nameToWatched[a]-nameToWatched[b]});
// Get biggest 5 and reverse so biggest is first
top5Names = top5Names.slice(-5).reverse();
for (var index in top5Names) {
    // Time in mins
    top5Times.push((nameToWatched[top5Names[index]])/60);
}



// Insert HTML
var NetflixStatsObject = document.getElementById("NetflixStats");
// This is handled by the build script
NetflixStatsObject.innerHTML = `{NetflixStatsHTML}`;



{nextScript}
