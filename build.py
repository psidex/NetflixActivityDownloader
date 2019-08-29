"""This is a build tool used to minify the NetflixStats.js file.
The jsmin library isn't perfect but it's good enough.
"""

import os
import shutil
import pathlib
import logging
from jsmin import jsmin


def create_minified_dir(minified_directory: pathlib.Path) -> None:
    """Create the minified directory. If it exists, remove it, then create it again."""
    if os.path.exists(minified_directory):
        shutil.rmtree(minified_directory)
        logging.info("Removed /minified")

    os.makedirs(minified_directory)
    logging.info("Created /minified")


def main() -> None:
    dir_minified = pathlib.Path("minified")
    dir_source = pathlib.Path("src")

    create_minified_dir(dir_minified)

    logging.info("Reading NetflixStats.js")
    with open(dir_source.joinpath("NetflixStats.js"), "r") as in_file:
        normal_js = in_file.read()

    logging.info("Minifying")
    minified = jsmin(normal_js, quote_chars="'\"`")  # quote_chars to support ES6

    logging.info("Writing minified file to /minified")
    with open(dir_minified.joinpath("NetflixStats.js"), "w") as out_file:
        out_file.write(minified)

    logging.info("Finished")


if __name__ == "__main__":
    logging_root = logging.getLogger()
    logging_root.setLevel(logging.DEBUG)
    main()
