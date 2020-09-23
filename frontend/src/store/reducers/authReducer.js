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
    STORE_REFRESH_TOKEN,
    FETCHING_USER_INFO_IN_PROGRESS,
    FETCHING_USER_INFO_COMPLETED
} from '../constants';


const initState = {
    isLoggedIn: false,
    registering: false,
    loggingIn: false,
    user: {},
    userId: null,
    token: null,
    refreshToken: null,
    error: null,
    fetchingUserInfo: false
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case REGISTRATION_IN_PROGRESS: {
            return {
                ...state,
                registering: true
            }
        }

        case REGISTRATION_COMPLETED: {
            return {
                ...state,
                registering: false
            }
        }

        case SET_USER_INFORMATION: {
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                userId: action.payload.userId,
                isLoggedIn: true
            }
        }

        case STORE_JWT_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }

        case LOGIN_IN_PROGRESS: {
            return {
                ...state,
                loggingIn: true
            }
        }

        case LOGIN_COMPLETED: {
            return {
                ...state,
                loggingIn: false
            }
        }

        case LOGOUT_USER: {
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                userId: null,
                token: null,
                refreshToken: null,
            }
        }

        case AUTH_401_ERROR: {
            return {
                ...state,
                error: 401,
                errorData:  action.payload
            }
        }

        case AUTH_404_ERROR: {
            return {
                ...state,
                error: 404
            }
        }

        case AUTH_500_ERROR: {
            return {
                ...state,
                error: 500
            }
        }

        case REMOVE_AUTH_ERRORS: {
            return {
                ...state,
                error: null,
                errorData: null
            }
        }

        case STORE_REFRESH_TOKEN: {
            return {
                ...state,
                refreshToken: action.payload
            }
        }

        case FETCHING_USER_INFO_IN_PROGRESS: {
            return {
                ...state,
                fetchingUserInfo: true
            }
        }
        case FETCHING_USER_INFO_COMPLETED: {
            return {
                ...state,
                fetchingUserInfo: false
            }
        }
       
        default: {
            return state;
        }
    }
}

export default authReducer;