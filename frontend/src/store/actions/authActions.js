import api from '../../api';

import {  
    ACTION_REGISTRATION_IN_PROGRESS,
    ACTION_REGISTRATION_COMPLETED,
    ACTION_LOGIN_IN_PROGRESS,
    ACTION_LOGIN_COMPLETED,
    ACTION_SET_USER_INFORMATION,
    ACTION_STORE_JWT_TOKEN,
    ACTION_LOGOUT_USER,
    ACTION_AUTH_401_ERROR,
    ACTION_AUTH_404_ERROR,
    ACTION_AUTH_500_ERROR,
    ACTION_REMOVE_AUTH_ERRORS,
    ACTION_STORE_REFRESH_TOKEN,
} from './authActionsList';
import {
    ACTION_STORE_FAVORITES
} from './pokemonActionsList';
import history from '../router/history';
import apiInstance from '../../api/apiConfig';

export const register = (email, username, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_REGISTRATION_IN_PROGRESS());
            const response = await api.register(email, username, password);
            if(response && response.data){
                dispatch(ACTION_SET_USER_INFORMATION(response.data.user, response.data.token, response.data.userId));
                dispatch(ACTION_STORE_REFRESH_TOKEN(response.data.refreshToken));
                dispatch(ACTION_STORE_FAVORITES(response.data.user?.pokemon));
                history.push('/favorites');
            }
            dispatch(ACTION_REGISTRATION_COMPLETED());
        } catch(error) {
            if(error.status === 401){
                const errors = [];
                error.data.forEach(validationError => {
                    errors.push(validationError.param);
                });
                dispatch(ACTION_AUTH_401_ERROR(errors));
            } 
            else {
                dispatch(ACTION_AUTH_500_ERROR());
            }

            dispatch(ACTION_REGISTRATION_COMPLETED());
        }
    }
}

export const login = (email, username, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_LOGIN_IN_PROGRESS());
            const response = await api.login(email, username, password);
            if(response && response.data){
                dispatch(ACTION_SET_USER_INFORMATION(response.data.user, response.data.token, response.data.userId));
                dispatch(ACTION_STORE_REFRESH_TOKEN(response.data.refreshToken));
                dispatch(ACTION_STORE_FAVORITES(response.data.user?.pokemon));
                dispatch(ACTION_LOGIN_COMPLETED());
                history.push('/favorites')
            }
        } catch(error) {
            if(error.status === 401){
                dispatch(ACTION_AUTH_401_ERROR());
            } 
            else if(error.status === 404){
                dispatch(ACTION_AUTH_404_ERROR());
            }
            else {
                dispatch(ACTION_AUTH_500_ERROR());
            }
            dispatch(ACTION_LOGIN_COMPLETED());
        }
    }
}


export const logout = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_LOGOUT_USER());
        dispatch(ACTION_STORE_FAVORITES([]));
        apiInstance.defaults.headers['Authorization'] = `Bearer null`;
    }
}

export const setToken = (token) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_JWT_TOKEN(token));
    }
}
export const setRefreshToken = (refreshToken) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_REFRESH_TOKEN(refreshToken));
    }
}
export const removeAuthErrors = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_REMOVE_AUTH_ERRORS());
    }
}