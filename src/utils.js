/**
 * Prompt client to download an object as a JSON file.
 * @param {Object} toSave The object to download. Must work with JSON.stringify.
 * @param {string} fileName The name of the file to be downloaded, defaults to data.json.
 */
export function downloadObjAsFile(toSave, fileName = 'data.json') {
  const hiddenElement = document.createElement('a');

  const blobUrl = URL.createObjectURL(new Blob(
    [JSON.stringify(toSave, null, 2)],
    { type: 'application/json' },
  ));

  hiddenElement.href = blobUrl;
  hiddenElement.download = fileName;

  hiddenElement.click();

  hiddenElement.remove();
  URL.revokeObjectURL(blobUrl);
}

/**
 * A small helper function for logging. d for debug.
 * @param {string} message
 */
export function d(message) {
  console.log(`[NetflixStats] ${message}`);
}
