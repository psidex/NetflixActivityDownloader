@echo off
echo Building compressed version from source
rm -rf minified
mkdir minified
uglifyjs source\main.js -c -m -o minified\main.js
