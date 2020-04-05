import { shaktiUrl } from './reactVariables.js';

/**
 * Get all the current users watch history.
 * @returns {Array} An array containing all objects of watched items.
 */
export async function downloadActivity() {
    let currentPage = 0;
    let viewingHistory = [];

    while (true) {
        console.log(`Fetching activity page ${currentPage}`);

        const response = await fetch(shaktiUrl + currentPage);
        if (!response.ok) {
            console.error('Fetching API failed:', response);
        }

        const data = await response.json();
        if (data.viewedItems.length === 0) {
            break;
        }

        viewingHistory = viewingHistory.concat(data.viewedItems);
        currentPage += 1;
    }

    return viewingHistory;
}
