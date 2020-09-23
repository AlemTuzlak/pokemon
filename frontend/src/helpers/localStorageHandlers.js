/* ----------------------------------------------------- */
/*                  ACCESS TOKEN METHODS                 */
/* ----------------------------------------------------- */

export const getAccessToken = () => {
    const auth = JSON.parse(localStorage.getItem('persist:auth'));
    const token = auth && auth.token ? auth.token.replace(/"/g, '') : null;
    return token;
}

export const getRefreshToken = () => {
    const auth = JSON.parse(localStorage.getItem('persist:auth'));
    const refreshToken = auth && auth.refreshToken ? auth.refreshToken.replace(/"/g, '') : null;
    return refreshToken;
}

export const getSessionId = () => {
    const common = JSON.parse(localStorage.getItem('persist:common'));
    const sessionId = common && common.sessionId ? common.sessionId : null;
    return sessionId;
}

export const setSessionId = () => {
    return localStorage.getItem('SID') ? localStorage.getItem('SID') : 'sadadsadsd';
}
