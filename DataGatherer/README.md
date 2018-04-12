# DataGatherer

A small javascript script that can extract information about your watch history

# WARNING

Use of this software may constitute a breach in the [Netflix Terms of Use](https://help.netflix.com/legal/termsofuse) and/or the [End User License Agreement](https://help.netflix.com/legal/eula). Use at your own risk.

# Usage

 - Go [here](https://raw.githubusercontent.com/thatguywiththatname/NetflixStats/master/DataGatherer/minified/main.js)
 - Press `CTRL+A` and then `CTRL+C` to highlight the code and copy it
 - Create a new bookmark in your browser, and where the URL goes, paste the code in
 - Name the bookmark whatever you want, maybe "NetflixStatsDownload"
 - Go to [your Netflix viewing activity](https://www.netflix.com/viewingactivity) 
 - Open your browsers console so you can see what is going on (F12 for Chrome, then click the "Console" tab)
 - Click the bookmark
 - You should now see a bunch of output in the console as your browser gathers all the information. If any errors occur you should see them here
 - When it is done your browser should download a JSON file called "Netflix-Watch-Stats.json". This has the following structure:

```json
{
    "viewedItems": {
        "80186848": {
            "title": "Jack Whitehall: Travels with My Father",
            "type": "series",
            "watchCount": 2,
            "watches": {
                "Season 1: \"Episode 6\"": {
                    "dateWatched": "17/02/2018",
                    "duration": 1805
                },
                "Season 1: \"Episode 5\"": {
                    "dateWatched": "17/02/2018",
                    "duration": 1931
                }
            }
        },
        "80189806": {
            "title": "Russell Howard: Recalibrate",
            "type": "film",
            "dateWatched": "26/12/2017",
            "duration": 4160
        }
    },
    "userDetails": {
        "name": "your_name",
        "guid": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "countryOfSignup": "GB",
        "currentCountry": "GB",
        "currentRegion": "eu-west-1",
        "membershipStatus": "CURRENT_MEMBER",
        "isInFreeTrial": false,
        "isKids": false
    }
}
```
