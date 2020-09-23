import {
    REGISTRATION_IN_PROGRESS,
    REGISTRATION_COMPLETED,
    SET_USER_INFORMATION,
    STORE_JWT_TOKEN,
    LOGIN_IN_PROGRESS,
    LOGIN_COMPLETED,
    LOGOUT_USER,
    AUTH_401_ERROR,
    AUTH_404_ERROR,
    AUTH_500_ERROR,
    REMOVE_AUTH_ERRORS,
    REGISTRATION_MODAL_OPEN,
    STORE_REFRESH_TOKEN,
    FETCHING_USER_INFO_IN_PROGRESS,
    FETCHING_USER_INFO_COMPLETED,
   
} from '../constants';

export const ACTION_REGISTRATION_IN_PROGRESS = () => { return { type: REGISTRATION_IN_PROGRESS } };
export const ACTION_REGISTRATION_COMPLETED = () => { return { type: REGISTRATION_COMPLETED } };
export const ACTION_REGISTRATION_MODAL_OPEN = (isOpen) => { return { type: REGISTRATION_MODAL_OPEN, payload: isOpen } };
export const ACTION_LOGIN_IN_PROGRESS = () => { return { type: LOGIN_IN_PROGRESS } };
export const ACTION_LOGIN_COMPLETED = () => { return { type: LOGIN_COMPLETED } };
export const ACTION_SET_USER_INFORMATION = (user, token, userId) => { return { type: SET_USER_INFORMATION, payload: { user: user, token: token, userId } } };
export const ACTION_STORE_JWT_TOKEN = (token) => { return { type: STORE_JWT_TOKEN, payload: token } };
export const ACTION_STORE_REFRESH_TOKEN = (refreshToken) => { return { type: STORE_REFRESH_TOKEN, payload: refreshToken } };
export const ACTION_LOGOUT_USER = () => { return { type: LOGOUT_USER } };


export const ACTION_AUTH_401_ERROR = (data) => { return { type: AUTH_401_ERROR, payload: data } };
export const ACTION_AUTH_404_ERROR = () => { return { type: AUTH_404_ERROR } };
export const ACTION_AUTH_500_ERROR = () => { return { type: AUTH_500_ERROR } };
export const ACTION_REMOVE_AUTH_ERRORS = () => { return { type: REMOVE_AUTH_ERRORS } };

export const ACTION_FETCHING_USER_INFO_IN_PROGRESS = () => { return { type: FETCHING_USER_INFO_IN_PROGRESS } };
export const ACTION_FETCHING_USER_INFO_COMPLETED = () => { return { type: FETCHING_USER_INFO_COMPLETED } };
