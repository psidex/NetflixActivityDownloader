"""
build.py

This takes all the files in /source, minifies them, inserts
the necessary HTML and CSS, then concatenates them all into
minified/NetflixStats.js

The minifiers aren't perfect but they are good enough
"""

import os
from shutil import rmtree
from jsmin import jsmin
from htmlmin import minify as htmlmin
from csscompressor import compress as cssmin

if __name__ == "__main__":
    # Sort out minified dir
    if os.path.exists("minified"):
        rmtree("minified")
    os.makedirs("minified")

    allFilesToRaw = {}

    # Minify all files + Load the contents into allFilesToRaw: {filename: rawContents}
    for filename in os.listdir("source"):

        if filename.endswith(".js"):
            with open("source/{}".format(filename), "r") as jsInFile:
                allFilesToRaw[filename] = jsmin(jsInFile.read())

        elif filename.endswith(".css"):
            with open("source/{}".format(filename), "r") as cssInFile:
                allFilesToRaw[filename] = cssmin(cssInFile.read())

        elif filename.endswith(".html"):
            with open("source/{}".format(filename), "r") as htmlInFile:
                allFilesToRaw[filename] = htmlmin(htmlInFile.read())

    # Insert the CSS and HTML into the relevant files
    for filename in allFilesToRaw:
        if filename == "PreLoad.js":
            # Inserts between style tags
            allFilesToRaw["PreLoad.js"] = allFilesToRaw["PreLoad.js"].replace("{injectCSS}", "<style>"+allFilesToRaw["inject.css"]+"</style>")
        elif filename == "Viewer.js":
            allFilesToRaw["Viewer.js"] = allFilesToRaw["Viewer.js"].replace("{NetflixStatsHTML}", allFilesToRaw["NetflixStats.html"])
        
    # Concatenate all the files
    order = ["PreLoad.js", "Utils.js", "DataGatherer.js", "Viewer.js", "Charts.js"]
    concatenated = "{nextScript}"
    for filename in order:
        concatenated = concatenated.replace("{nextScript}", allFilesToRaw[filename])

    with open("minified/NetflixStats.js", "w") as outFile:
        outFile.write(concatenated)
