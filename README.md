# NetflixStats

A collection of tools that can extract and visualise your Netflix watch history

Currently just 1 javascript bookmarklet, but more is planned.

# Usage

 - Go to /minified in this repository, click on `main.js` and click `raw`
 - Press `CTRL+A` and then `CTRL+C` to highlight the code and copy it
 - Create a new bookmark in your browser, and where the URL goes, paste the code in
 - Name the bookmark whatever you want, maybe "NetflixStats"
 - Go to https://www.netflix.com/viewingactivity and 
 - Open your browsers console so you can see what is going on (F12 for Chrome, then click the "Console" tab)
 - Click the bookmark
 - You should see a bunch of output in the console as your browser gathers all the information
 - When it is done your browser should download a JSON file called "Netflix-Watch-Stats.json". This has the following structure:

```json
{
    "The Abyss": {
        "type": "film",
        "watchCount": 1,
        "watches": {
            "The Abyss": {
                "dateWatched": "04/04/2018",
                "duration": 8422
            }
        }
    },
    "The IT Crowd": {
        "type": "series",
        "watchCount": 23,
        "watches": {
            "Series 5: \"The Final Episode\"": {
                "dateWatched": "06/04/2018",
                "duration": 2882
            },
            "Series 4: \"Reynholm vs Reynholm\"": {
                "dateWatched": "06/04/2018",
                "duration": 1469
            }
        }
    }
}
```

# WARNING

I am not aware of how Netflix handle their internal APIs, I do not know if there are rate limits or specific usage conditions. I am not responsible for any consequences of using this software, such as if you get banned from their services.
