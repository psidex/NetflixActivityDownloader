import { d, downloadObjAsFile } from './utils.js';
import downloadActivity from './api.js';
import popupHtml from './popup.html';

// eslint-disable-next-line no-undef
d(`Loaded v${VERSION}`);

const div = document.body.appendChild(document.createElement('div'));
div.innerHTML = popupHtml;

div.style.cssText = 'position: absolute; background-color: white; z-index: 20;'
    + 'transform: translate(-50%, -50%); left: 50%; top: 50%; padding: 1em; border-style: solid;';

div.querySelector('button').addEventListener('click', async () => {
    const data = await downloadActivity();
    downloadObjAsFile(data);
});
