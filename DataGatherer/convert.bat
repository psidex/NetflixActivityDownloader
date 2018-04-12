@echo off
echo Converting /minified to bookmarklet

::https://stackoverflow.com/a/7105690
echo|set /p="void 0" >> minified\main.js

::https://stackoverflow.com/a/550737
echo|set /p="javascript:" >> minified\temp.txt
type minified\main.js >> minified\temp.txt
type minified\temp.txt > minified\main.js

rm minified\temp.txt
