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
    const cjs = document.createElement('script');
    const jsLoadPromise = onload2promise(cjs);
    cjs.type = 'text/javascript';
    cjs.src = chartistJs;
    document.head.appendChild(cjs);
    await jsLoadPromise;

    const ccss = document.createElement('link');
    const cssLoadPromise = onload2promise(ccss);
    ccss.rel = 'stylesheet';
    ccss.type = 'text/css';
    ccss.href = chartistCss;
    document.head.appendChild(ccss);
    await cssLoadPromise;
}
