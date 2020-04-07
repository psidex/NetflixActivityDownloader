import { d } from './utils.js';
import { createPopup } from './dom.js';

async function main() {
    // eslint-disable-next-line no-undef
    d(`Loaded v${VERSION}`);

    createPopup();
}

main();
