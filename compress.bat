@echo off
echo Building compressed version from source
rm -rf minified
mkdir minified
minify --simplify source -d minified
