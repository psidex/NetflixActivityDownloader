"""This is a build tool used to minify and cat together all the seperate parts of the
NetflixStats script. The jsmin library isn't perfect but it's good enough.
"""

import os
import shutil
import pathlib
import logging
from typing import Dict
from jsmin import jsmin

DIR_MINIFIED = pathlib.Path("minified")
DIR_SOURCE = pathlib.Path("src")


def create_minified_dir() -> None:
    """Create the minified directory. If it exists, remove it, then create it again."""
    if os.path.exists(DIR_MINIFIED):
        shutil.rmtree(DIR_MINIFIED)
        logging.info("Removed /minified")

    os.makedirs(DIR_MINIFIED)
    logging.info("Created /minified")


def load_files() -> Dict[str, str]:
    """Load all .html .js & .css files from /src into a dictionary."""
    files = {}

    for file_name in os.listdir(DIR_SOURCE):
        file_ext = file_name.split(".")[-1]

        if file_ext == "js":
            logging.info(f"Loading file: {file_name}")
            file_path = DIR_SOURCE.joinpath(file_name)

            with open(file_path, "r") as in_file:
                file_data = in_file.read()

            files[file_name] = file_data

        else:
            logging.info(f"Skipped file: {file_name}")

    return files


def concat_files(minified_files: Dict[str, str]) -> str:
    """Concatenate all of the .js files together using the "nextfile" line as a guide."""

    # Used to determine the order to concat stuff together
    order = ["preload.js", "datagatherer.js", "viewer.js", "charts.js"]

    concatenated = "{ nextfile }"
    for filename in order:
        logging.info(f"Concatenating {filename}")
        concatenated = concatenated.replace("{ nextfile }", minified_files[filename])

    return concatenated


def main() -> None:
    create_minified_dir()
    all_files = load_files()
    concatenated = concat_files(all_files)

    logging.info("Minifying concatenated file")
    minified = jsmin(concatenated, quote_chars="'\"`")  # quote_chars to support ES6

    with open(DIR_MINIFIED.joinpath("NetflixStats.js"), "w") as out_file:
        out_file.write(minified)

    logging.info(f"Minified file written to /minified")
    logging.info("Finished")


if __name__ == "__main__":
    logging_root = logging.getLogger()
    logging_root.setLevel(logging.DEBUG)
    main()
