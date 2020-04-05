/**
 * Prompt client to download an object as a JSON file.
 * @param {Object} toSave The object to download.
 * @param {string} fileName The name of the file to be downloaded, defaults to data.json.
 */
export function downloadObjAsFile(toSave, fileName = 'data.json') {
    const jsonStr = JSON.stringify(toSave);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:attachment/json,${encodeURI(jsonStr)}`;
    hiddenElement.download = fileName;
    hiddenElement.click();
    hiddenElement.remove();
}
