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
DIR_SOURCE = pathlib.Path("source")


def build_minified_dir() -> None:
    """If the minified dir exists, remove it, then create it again."""
    if os.path.exists(DIR_MINIFIED):
        shutil.rmtree(DIR_MINIFIED)
        logging.info(f"Removed old minified directory: {DIR_MINIFIED}")

    os.makedirs(DIR_MINIFIED)
    logging.info(f"Created minified directory: {DIR_MINIFIED}")


def load_and_minify_files() -> Dict[str, str]:
    """Load all .html .js & .css files from source/ into a dictionary and minify them."""
    files = {}

    for file_name in os.listdir(DIR_SOURCE):

        file_ext = file_name.split(".")[-1]
        if file_ext == "js":
            logging.info(f"Processing file: {file_name}")

            file_path = DIR_SOURCE.joinpath(file_name)
            with open(file_path, "r") as in_file:
                file_data = in_file.read()

            # quote_chars param to support ES6+
            files[file_name] = jsmin(file_data, quote_chars="'\"`")

        else:
            logging.info(f"Skipped file: {file_name}")

    return files


def concat_files(minified_files: Dict[str, str]) -> str:
    """Concatenate all of the .js files together using the {nextfile} line as a guide."""

    # Used to determine the order to concat stuff together
    order = ["preload.js", "datagatherer.js", "viewer.js", "charts.js"]

    concatenated = "{nextfile}"
    for filename in order:
        logging.info(f"Concatenating {filename}")

        # In the files it is written as "{ nextfile }" but jsmin removes the spaces
        concatenated = concatenated.replace("{nextfile}", minified_files[filename])

    return concatenated


def main() -> None:
    build_minified_dir()
    minified_files = load_and_minify_files()
    concatenated = concat_files(minified_files)

    with open(DIR_MINIFIED.joinpath("NetflixStats.js"), "w") as out_file:
        out_file.write(concatenated)

    logging.info(f"Minified file written to {DIR_MINIFIED}")
    logging.info("Finished")


if __name__ == "__main__":
    logging_root = logging.getLogger()
    logging_root.setLevel(logging.DEBUG)
    main()
