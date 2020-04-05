import { downloadActivity } from './api.js';
import { downloadObjAsFile } from './utils.js';

async function main() {
    console.log('Loaded');
    const activity = await downloadActivity();
    downloadObjAsFile(activity);
}

main();
