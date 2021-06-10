import { d, downloadObjAsFile } from './utils';
import downloadActivity from './api';
import popupHtml from './popup.html';
import popupCss from './popup.css';

// eslint-disable-next-line no-undef
d(`Loaded v${VERSION}`);

const div = document.body.appendChild(document.createElement('div'));
div.innerHTML = popupHtml;
div.id = 'downloader';
div.style.cssText = popupCss.toString();

div.querySelector('#downloaderButton').addEventListener('click', async () => {
  const data = await downloadActivity();
  downloadObjAsFile(data);
});
