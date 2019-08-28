function gatherWatchInfo(callback, currentPage = 0) {
    /*
     * Iterates through all watch history pages and pulls the needed info
     * Populates the global window.flixStats object
     */

    console.log("Getting page " + currentPage);

    fetch(activityURL + currentPage)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.viewedItems[0] === undefined) {
                console.log("No viewed items in page, finished gathering pages");
                callback();
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
                                [itemMovieID]: episodeData
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

                // First time I have ever found a proper use case for recursion :O
                gatherWatchInfo(callback, currentPage + 1);
            }
        });
}

gatherWatchInfo(() => {
    console.log("Finished gathering data");
    view();
});