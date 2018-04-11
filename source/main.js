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
var apiInfo = window.netflix.reactContext.models.serverDefs.data;
var apiBase = apiInfo.API_BASE_URL;
var apiIdent = apiInfo.BUILD_IDENTIFIER;
var activityURL = "https://" + apiInfo.host + "/api" + apiBase + "/" + apiIdent + "/viewingactivity?pg=";
console.log("using URL: " + activityURL);
/* END Internal API stuff */



/* Main */
let watchStats = {};
var pageCount = 0;
function gatherInfo(callback) {
    console.log("\nGetting: " + activityURL + pageCount);
    getJSON(activityURL+pageCount, (data) => {
        if (data.viewedItems[0] === undefined) {
            console.log("No viewed items in page\n\nFinished gathering pages");
            callback();
        } else {
            // For each episode in the data
            for (var i = 0; i < data.viewedItems.length; i++) {
                var episodeData = data.viewedItems[i];
                
                // Extract title and type of show / film
                var seriesTitle = "unknown";
                var episodeType = "series";  // Default to series
                if (episodeData.seriesTitle) {
                    seriesTitle = episodeData.seriesTitle
                } else {
                    seriesTitle = episodeData.videoTitle
                    episodeType = "film";
                }
                
                // Details about the episode watched
                var episodeObj = {"dateWatched": episodeData.dateStr, "duration": episodeData.duration};

                // If not in watchStats object
                if (!watchStats[seriesTitle]) {
                    // Created new obj & add data
                    watchStats[seriesTitle] = {}
                    watchStats[seriesTitle].type = episodeType;
                    watchStats[seriesTitle].watchCount = 1;
                    watchStats[seriesTitle].watches = {[episodeData.title]: episodeObj};
                } else {
                    // Update data
                    watchStats[seriesTitle].watchCount++;
                    watchStats[seriesTitle].watches[episodeData.title] = episodeObj;
                }
                
                console.log("Parsed: " + seriesTitle);
            }
            pageCount++;
            // First time I have ever found a use for recursion :O
            gatherInfo(callback);
        }
    });
}

gatherInfo(() => {
    console.log("\nDone\n");
    console.log(watchStats);
    downloadJSONToFile(watchStats, "Netflix-Watch-Stats.json");
});
