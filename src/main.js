import { getVarsFromReact } from './variables.js';
import { downloadActivity } from './api.js';

/**
 * Prompt client to download a JS object as a file.
 * @param toSave
 * @param fileName
 */
function downloadObjAsFile(toSave, fileName = 'data.json') {
    const jsonStr = JSON.stringify(toSave);
    const hiddenElement = document.createElement('a');

    hiddenElement.href = `data:attachment/json,${encodeURI(jsonStr)}`;
    hiddenElement.download = fileName;

    hiddenElement.click();

    hiddenElement.remove();
}

async function main() {
    console.log('Loaded NetflixStats');
    const { shaktiActivityUrl, userInfo } = getVarsFromReact();
    const activity = await downloadActivity(shaktiActivityUrl);
    downloadObjAsFile(activity);
}

main();
