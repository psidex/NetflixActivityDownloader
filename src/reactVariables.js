export const {
    userInfo: { data: userInfo },
    serverDefs: { data: serverDefs },
} = window.netflix.reactContext.models;

export const shaktiUrl = `${serverDefs.API_ROOT}/shakti/${serverDefs.BUILD_IDENTIFIER}`
                            + `/viewingactivity?authURL=${userInfo.authUrl}&pg=`;
