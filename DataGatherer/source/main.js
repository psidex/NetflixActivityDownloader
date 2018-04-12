/* Util functions */
function getJSON(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                alert(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    }; 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Thanks https://stackoverflow.com/a/34156339
function downloadJSONToFile(content, fileName) {
    content = JSON.stringify(content);
    var a = document.createElement("a");
    var file = new Blob([content], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
/* END Util functions */



/* Internal API stuff */
var flixInfo = window.netflix.reactContext.models.serverDefs.data;
var userInfo = window.netflix.reactContext.models.userInfo.data;
var activityURL = 
    flixInfo.SHAKTI_API_ROOT
    + "/" + flixInfo.BUILD_IDENTIFIER
    + "/viewingactivity?"
    + "authURL=" + userInfo.authURL
    + "&pgSize=100"
    + "&pg=";

console.log("using URL: " + activityURL);
/* END Internal API stuff */



/* Main */
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
    console.log("\nGetting: " + activityURL + pageCount);
    getJSON(activityURL+pageCount, (data) => {
        if (data.viewedItems[0] === undefined) {
            console.log("No viewed items in page\n\nFinished gathering pages");
            callback();
        } else {
            // For each episode in the data
            for (var i = 0; i < data.viewedItems.length; i++) {
                var episodeData = data.viewedItems[i];
                
                // Extract title, ID, and type of series / film
                var generalTitle = "unknown";
                var generalType = "series";  // Default to series
                var generalID;  // Needs to be declared before variable assignment
                if (episodeData.seriesTitle) {
                    generalTitle = episodeData.seriesTitle
                    generalID = episodeData.series;
                } else {
                    generalType = "film";
                    generalTitle = episodeData.videoTitle
                    generalID = episodeData.movieID;
                }

                // Get some details about the episode watched if it is part of a series (not a film)
                if (generalType == "series") {
                    var episodeObj = {"title": episodeData.title, "dateWatched": episodeData.dateStr, "duration": episodeData.duration};
                }

                // If not in flixStats object
                if (!flixStats.viewedItems[generalID]) {
                    // Created new obj & add data
                    flixStats.viewedItems[generalID] = {}
                    flixStats.viewedItems[generalID].title = generalTitle;
                    flixStats.viewedItems[generalID].type = generalType;
                    
                    if (generalType == "series") {
                        flixStats.viewedItems[generalID].watchCount = 1;  // No repeated data so films will only ever be watched once
                        // For series movieID will be the individual episodes ID
                        flixStats.viewedItems[generalID].watchedEpisodes = {[episodeData.movieID]: episodeObj};
                    } else {
                        flixStats.viewedItems[generalID].dateWatched = episodeData.dateStr;
                        flixStats.viewedItems[generalID].duration = episodeData.duration;
                    }

                } else {
                    // Update data - Netflix doesen't track repeated watches so only type=="series" will be changed here
                    flixStats.viewedItems[generalID].watchCount++;
                    flixStats.viewedItems[generalID].watchedEpisodes[episodeData.movieID] = episodeObj;
                }
                
                console.log("Parsed: " + generalTitle);
            }
            pageCount++;
            // First time I have ever found a use for recursion :O
            gatherWatchInfo(callback);
        }
    });
}

gatherWatchInfo(() => {
    console.log("\nDone\n");
    console.log(flixStats);
    downloadJSONToFile(flixStats, "Netflix-Stats.json");
});
