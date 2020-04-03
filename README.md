# NetflixStats

A small script to extract and dispay information about your Netflix watch history

## WARNING

Use of this software may constitute a breach in the [Netflix Terms of Use](https://help.netflix.com/legal/termsofuse). Use at your own risk.

## Usage

- Highlight and copy **ALL** the code below

 ```javascript
javascript:s=document.createElement('script');s.type='module';s.src='https://psidex.github.io/NetflixStats/src/main.js';document.head.appendChild(s);void 0
```

- Create a new bookmark in your browser, and where the URL goes, paste the code in
- Name the bookmark whatever you want, maybe "NetflixStats"
- Go to [your Netflix viewing activity](https://www.netflix.com/viewingactivity) 
- Click the bookmark
- If all went well, you should now see a loading symbol (it may take a minute or two to gather all the required data)
- If nothing happens, open your browsers console so you can see what is going on (F12 for Chrome & Firefox, then click the "Console" tab). If there are any errors you will see them highlighted in red

## Notes / FAQ

- Netflix does not keep a 100% accurate record of your watch history. If you skip credits or stop watching 3/4 of the way through something it can count it as a full watch. This means sometimes your longest watched day can be more than 24 hours.
