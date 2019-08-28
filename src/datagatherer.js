/* DataGatherer.js
 * Gathers all the info from Netflix's Shakti API
 * Saves the info as a global JS var: "flixStats"
*/

// Internal API stuff
var flixInfo = window.netflix.reactContext.models.serverDefs.data;
var userInfo = window.netflix.reactContext.models.userInfo.data;
var activityURL = flixInfo.API_ROOT + "/shakti/" + flixInfo.BUILD_IDENTIFIER + "/viewingactivity?" + "authURL=" + userInfo.authURL + "&pgSize=100" + "&pg=";
console.log("Using API URL: " + activityURL);

var flixStats = {
    viewedItems: {},
    userDetails: {
        name: userInfo.name,
        guid: userInfo.guid,
        countryOfSignup: userInfo.countryOfSignup,
        currentCountry: userInfo.currentCountry,
        currentRegion: userInfo.currentRegion,
        membershipStatus: userInfo.membershipStatus,
        isInFreeTrial: userInfo.isInFreeTrial,
        isKids: userInfo.isKids
    }
};

var pageCount = 0;

function gatherWatchInfo(callback) {
    console.log("Getting page " + pageCount);

    fetch(activityURL + pageCount)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.viewedItems[0] === undefined) {
                console.log("No viewed items in page, finished gathering pages");
                callback();
            }

            else {
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
                        var episodeData = { "title": itemData.title, "dateWatched": itemData.dateStr, "duration": itemData.duration };
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
                            flixStats.viewedItems[itemUniqueID].watchedEpisodes = { [itemMovieID]: episodeData };
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

                pageCount++;
                // First time I have ever found a proper use case for recursion :O
                gatherWatchInfo(callback);
            }
        });
}

gatherWatchInfo(() => {
    console.log("Finished gathering data");
    { nextfile }
});
