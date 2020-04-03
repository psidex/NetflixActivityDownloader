/**
 * Grab all the watch history.
 * @param shaktiHistoryURL - The API URL for activity.
 * @returns An array containing all objects of watched items.
 */
export async function downloadActivity(shaktiHistoryURL) {
    let currentPage = 0;
    const viewingHistory = [];

    while (true) {
        console.log('Fetching activity page', currentPage);

        const response = await fetch(shaktiHistoryURL + currentPage);
        if (!response.ok) {
            console.error('Fetching API failed:', response);
        }

        const data = await response.json();
        if (data.viewedItems.length === 0) {
            break;
        }

        viewingHistory.concat(data.viewedItems);
        currentPage += 1;
    }

    return viewingHistory;
}
