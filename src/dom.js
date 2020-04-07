import { d } from './utils.js';
import popupHtml from './popup.html';

const chartistCss = 'https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.min.css';
const chartistJs = 'https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.min.js';

/**
 * Creates a promise for a DOM element that resolves with .onload or rejects with .onerror.
 * Idea from https://stackoverflow.com/a/46399452.
 * @param {Element} targetElement The DOM element you are going to dynamically load.
 * @returns {Promise<Element>}
 */
function onload2promise(targetElement) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-param-reassign
        targetElement.onload = () => resolve(targetElement);
        // eslint-disable-next-line no-param-reassign
        targetElement.onerror = reject;
    });
}

/**
 * Inserts chartist into document.head and waits for the CSS and JS files to load.
 */
export async function loadChartist() {
    const cjs = document.head.appendChild(document.createElement('script'));
    const ccss = document.head.appendChild(document.createElement('link'));

    const jsLoadPromise = onload2promise(cjs);
    const cssLoadPromise = onload2promise(ccss);

    cjs.type = 'text/javascript';
    cjs.src = chartistJs;

    ccss.rel = 'stylesheet';
    ccss.type = 'text/css';
    ccss.href = chartistCss;

    await jsLoadPromise;
    await cssLoadPromise;

    d('Chartist loaded');
}

export function createPopup() {
    const div = document.body.appendChild(document.createElement('div'));
    div.innerHTML = popupHtml;
    div.style.cssText = 'position: absolute; background-color: white; z-index: 20;'
        + 'transform: translate(-50%, -50%); left: 50%; top: 50%; padding: 1em;';
}
