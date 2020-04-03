/**
 * Grab the data that we can from the Netflix reactContext.
 * @returns The internal API URL we can use as well as data stored about the user.
 */
export function getVarsFromReact() {
    const {
        userInfo: { data: userInfo },
        serverDefs: { data: serverDefs },
    } = window.netflix.reactContext.models;
    const shaktiActivityUrl = `${serverDefs.API_ROOT}/shakti/${serverDefs.BUILD_IDENTIFIER}/viewingactivity?authURL=${userInfo.authURL}&pg=`;
    return {
        shaktiActivityUrl,
        userInfo,
    };
}
