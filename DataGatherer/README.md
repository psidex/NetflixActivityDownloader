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
 - When it is done your browser should download a JSON file called "Netflix-Stats.json". This has the following structure:

```json
{
    "viewedItems": {
        "70136112": {
            "title": "The Office (U.K.)",
            "type": "series",
            "watchCount": 2,
            "watchedEpisodes": {
                "70075284": {
                    "title": "Series 1: \"Downsize\"",
                    "dateWatched": "19/03/2018",
                    "duration": 1804
                },
                "70075285": {
                    "title": "Series 1: \"Work Experience\"",
                    "dateWatched": "23/03/2018",
                    "duration": 1764
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

 - The keys in `viewedItems` are the unique ID for the film / series as a whole, and the keys in `watchedEpisodes` are the individual episode IDs
 - This structure was chosen so that there is not chance of the keys conflicting, which would happen if something like the titles were used, as 2 episodes / films can have the same title
