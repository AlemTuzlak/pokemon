import { store } from '../store';
import { getRefreshToken } from '../helpers/localStorageHandlers';
import api from './index';
import { logout, setToken, setRefreshToken } from '../store/actions/authActions';
import apiInstance from './apiConfig';
import { refreshTokenProcess } from './apiConfig';

export const handle401 = async (originalRequest) => {
    const refreshToken = await getRefreshToken();

    if (refreshToken) {
        
        const retryOriginalRequest = new Promise(resolve => {
            addRequestToQueue(newAccessToken => {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                resolve(apiInstance.request(originalRequest));
            });
        });
        
        if (!refreshTokenProcess.isRefreshingTokenInProgress) {
            refreshTokenProcess.isRefreshingTokenInProgress = true;
            try {
                const response = await api.refreshToken(refreshToken);
                if(response?.data) {
                    store.dispatch(setToken(response.data.accessToken));
                    store.dispatch(setRefreshToken(response.data.refreshToken));
                    refreshTokenProcess.isRefreshingTokenInProgress = false;
                    passNewAccessTokenToRequestsOnQueue(response.data.accessToken);
                    refreshTokenProcess.requestsQueue = [];
                }
            } catch(error) {
                store.dispatch(logout());
                return Promise.reject(error);
            }
        }
        return retryOriginalRequest;
    }
    else {
        store.dispatch(logout());
        return Promise.reject('Suspicious, send to login');
    }
}

const addRequestToQueue = (request) => {
    refreshTokenProcess.requestsQueue.push(request);
}

const passNewAccessTokenToRequestsOnQueue = (newAccessToken) => {
    refreshTokenProcess.requestsQueue.map(cb => cb(newAccessToken));
}