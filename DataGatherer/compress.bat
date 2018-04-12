@echo off
echo Building compressed version from source
rm -rf minified
mkdir minified
uglifyjs source\DataGatherer.js -c -m -o minified\DataGatherer-min.js
