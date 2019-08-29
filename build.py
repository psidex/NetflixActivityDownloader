"""This is a build tool used to minify the NetflixStats.js file.
The jsmin library isn't perfect but it's good enough.
"""

import os
import shutil
import pathlib
import logging
from jsmin import jsmin


def main() -> None:
    dir_minified = pathlib.Path("minified")
    dir_source = pathlib.Path("src")

    if os.path.exists(dir_minified):
        shutil.rmtree(dir_minified)
        logging.info("Removed /minified")

    os.makedirs(dir_minified)
    logging.info("Created /minified")

    logging.info("Reading NetflixStats.js")
    with open(dir_source.joinpath("NetflixStats.js"), "r") as in_file:
        normal_js = in_file.read()

    logging.info("Minifying")
    minified = jsmin(normal_js, quote_chars="'\"`")  # quote_chars to support ES6

    logging.info("Writing minified file to /minified")
    with open(dir_minified.joinpath("NetflixStats.min.js"), "w") as out_file:
        out_file.write(minified)

    logging.info("Finished")


if __name__ == "__main__":
    logging_root = logging.getLogger()
    logging_root.setLevel(logging.DEBUG)
    main()
