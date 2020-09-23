import axios from 'axios';
import { getAccessToken } from '../helpers/localStorageHandlers';

import { handle401 } from './errorHandling';
import { config } from '../config';

let isRefreshingTokenInProgress = false;
let requestsQueue = [];

const apiInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Accept': 'application/json',
        'ApiKey': 's5xR6P1t298TQfNBTLpZzR9g242ZmL0z7fiOULUk3wixwOnx57aZQU9JZokdR43S',
    }
});

// Add a response interceptor
apiInstance.interceptors.response.use(function (response) {
    if(response?.data?.token || response?.data?.accessToken){
        const token = response.data.token || response.data.accessToken;
        apiInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return response;
  }, async function (error) {
    let passError = {};
    if(!error.response){
        passError = new Error();
        passError.status = 500;
        passError.data = null;
        passError.message = 'No Server error response';
        return Promise.reject(passError);
    } else {
        if(error.response.data.message === 'User token expired' && error.response.status === 401){
            return await handle401(error.config)
            
        }
        else {
            passError.status = error.response.status;
            passError.data = error.response.data.data;
            passError.message = error.response.data.message;
            passError.code = error.response.data.code;
            return Promise.reject(passError);
        }
    }
});


export const refreshTokenProcess = {
    isRefreshingTokenInProgress,
    requestsQueue
}

export default apiInstance;