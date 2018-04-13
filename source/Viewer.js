/*
 * Viewer.js
 * Performs some calculations on the flixStats data
 * Inserts the custom HTML into the NetflixStats div
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

// Adds up all time values for a time watched total
var totalSecondsWatched = 0;
for (var property in nameToWatched) totalSecondsWatched += nameToWatched[property];

// Calculates the top 5 most watched dates and how many hours
var top5WatchedDates_Times = [];
// Sorts an object using values, not sure how it works... https://stackoverflow.com/a/16794116
var top5WatchedDates = Object.keys(dateToWatched).sort(function(a,b){return dateToWatched[a]-dateToWatched[b]});
// Get biggest 5 and reverse so biggest is first
top5WatchedDates = top5WatchedDates.slice(-5).reverse();
for (var index in top5WatchedDates) {
    // Time in hours
    top5WatchedDates_Times.push((dateToWatched[top5WatchedDates[index]])/60/60);
}

// Same as above but top shows
var top5WatchedShows_Times = [];
var top5WatchedShows = Object.keys(nameToWatched).sort(function(a,b){return nameToWatched[a]-nameToWatched[b]});
top5WatchedShows = top5WatchedShows.slice(-5).reverse();
for (var index in top5WatchedShows) {
    top5WatchedShows_Times.push((nameToWatched[top5WatchedShows[index]])/60/60);
}



// Insert HTML
var NetflixStatsObject = document.getElementById("NetflixStats");
// This is handled by the build script
NetflixStatsObject.innerHTML = `{NetflixStatsHTML}`;



{nextScript}
