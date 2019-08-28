"""This is a build tool used to minify and cat together all the seperate parts of the
NetflixStats script. The jsmin library isn't perfect but it's good enough.
"""

import os
import shutil
import pathlib
import logging
from typing import Dict
from jsmin import jsmin


def create_minified_dir(minified_directory: pathlib.Path) -> None:
    """Create the minified directory. If it exists, remove it, then create it again."""
    if os.path.exists(minified_directory):
        shutil.rmtree(minified_directory)
        logging.info("Removed /minified")

    os.makedirs(minified_directory)
    logging.info("Created /minified")


def load_files(source_directory: pathlib.Path) -> Dict[str, str]:
    """Load all .html .js & .css files from /src into a dictionary."""
    files = {}

    for file_name in os.listdir(source_directory):
        file_ext = file_name.split(".")[-1]

        if file_ext == "js":
            logging.info(f"Loading file: {file_name}")
            file_path = source_directory.joinpath(file_name)

            with open(file_path, "r") as in_file:
                files[file_name] = in_file.read()

        else:
            logging.info(f"Skipped file: {file_name}")

    return files


def concat_files(file_data_dict: Dict[str, str]) -> str:
    """Concatenate all of the .js files."""
    order = ["preload.js", "viewer.js", "datagatherer.js"]
    concatenated = ""

    for filename in order:
        logging.info(f"Concatenating {filename}")
        concatenated += file_data_dict[filename]

    return concatenated


def main() -> None:
    dir_minified = pathlib.Path("minified")
    dir_source = pathlib.Path("src")

    create_minified_dir(dir_minified)
    file_data_dict = load_files(dir_source)
    concatenated = concat_files(file_data_dict)

    logging.info("Minifying concatenated file")
    minified = jsmin(concatenated, quote_chars="'\"`")  # quote_chars to support ES6

    with open(dir_minified.joinpath("NetflixStats.js"), "w") as out_file:
        out_file.write(minified)

    logging.info(f"Minified file written to /minified")
    logging.info("Finished")


if __name__ == "__main__":
    logging_root = logging.getLogger()
    logging_root.setLevel(logging.DEBUG)
    main()
