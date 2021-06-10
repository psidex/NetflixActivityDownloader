import { d } from './utils';

const {
  userInfo: {
    data: userInfo,
  },
  serverDefs: {
    data: serverDefs,
  },
} = window.netflix.reactContext.models;

const shaktiUrl = `${serverDefs.API_ROOT}/shakti/${serverDefs.BUILD_IDENTIFIER}/viewingactivity?authURL=${userInfo.authUrl}&pg=`;

/**
 * Get all the current users watch history.
 * @returns {Array} An array containing all objects of watched items.
 */
export default async function downloadActivity() {
  let currentPage = 0;
  let viewingHistory = [];

  while (true) {
    d(`Fetching activity page ${currentPage}`);

    const response = await fetch(shaktiUrl + currentPage);
    if (!response.ok) {
      d(`Fetching API failed: ${response}`);
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
