"""This is a build tool used to minify the NetflixStats.js file.
The jsmin library isn't perfect but it's good enough.
"""

import os
import pathlib
import logging
import time
import sys

from jsmin import jsmin
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

DIR_MINIFIED = pathlib.Path("minified")
DIR_SOURCE = pathlib.Path("src")


class MinifyNetflixStatsEventHandler(FileSystemEventHandler):
    def dispatch(self, event):
        """Minify NetflixStats.js inside /src to /minified"""
        if event.is_directory and not event.src_path.endswith("NetflixStats.js"):
            return  # Don't do anything if NetflixStats didn't change

        logging.info("Detected change in NetflixStats.js")

        if not os.path.exists(DIR_MINIFIED):
            os.makedirs(DIR_MINIFIED)
            logging.info("Created /minified")

        logging.info("Reading NetflixStats.js")
        with open(DIR_SOURCE.joinpath("NetflixStats.js"), "r") as in_file:
            normal_js = in_file.read()

        logging.info("Minifying")
        minified = jsmin(normal_js, quote_chars="'\"`")  # quote_chars to support ES6

        logging.info("Writing minified file to /minified")
        with open(DIR_MINIFIED.joinpath("NetflixStats.min.js"), "w") as out_file:
            out_file.write(minified)

        logging.info("Finished")


def startFileWatcher():
    """Watch /src for changes and minify NetflixStats.js on a change"""
    path = str(DIR_SOURCE)
    event_handler = MinifyNetflixStatsEventHandler()

    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()

    logging.info("Watching /src for changes")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    logging.info("Stopping")
    observer.join()


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    startFileWatcher()
