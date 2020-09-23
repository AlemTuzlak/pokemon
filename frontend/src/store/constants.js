//* -------------------------------------------------------------- //
//*                    AUTH ENDPOINT CONSTANTS                     //
//* -------------------------------------------------------------- //
//? Constants for handling registration endpoint
export const REGISTRATION_IN_PROGRESS = 'REGISTRATION_IN_PROGRESS';
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_MODAL_OPEN = 'REGISTRATION_MODAL_OPEN';
//? Constants for handling login endpoint
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';

//? Constants for handling general authentication state
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
export const STORE_JWT_TOKEN = 'STORE_JWT_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const STORE_REFRESH_TOKEN = 'STORE_REFRESH_TOKEN';
//?  Constants for error handling
export const AUTH_401_ERROR = 'AUTH_401_ERROR';
export const AUTH_404_ERROR = 'AUTH_404_ERROR';
export const AUTH_500_ERROR = 'AUTH_500_ERROR';
export const REMOVE_AUTH_ERRORS = 'REMOVE_AUTH_ERRORS';
//? Get user info constants
export const FETCHING_USER_INFO_IN_PROGRESS = 'FETCHING_USER_INFO_IN_PROGRESS';
export const FETCHING_USER_INFO_COMPLETED = 'FETCHING_USER_INFO_COMPLETED';

//* -------------------------------------------------------------- //
//*                 POKEMON ENDPOINT CONSTANTS                     //
//* -------------------------------------------------------------- //
export const FETCHING_ALL_POKEMON_IN_PROGRESS = 'FETCHING_ALL_POKEMON_IN_PROGRESS';
export const STORE_ALL_POKEMON = 'STORE_ALL_POKEMON';
export const FETCHING_ALL_POKEMON_COMPLETED = 'FETCHING_ALL_POKEMON_COMPLETED';

export const FETCHING_SINGLE_POKEMON_IN_PROGRESS = 'FETCHING_SINGLE_POKEMON_IN_PROGRESS';
export const FETCHING_SINGLE_POKEMON_COMPLETED = 'FETCHING_SINGLE_POKEMON_COMPLETED';
export const STORE_SINGLE_POKEMON = 'STORE_SINGLE_POKEMON';

export const STORING_FAVORITE_IN_PROGRESS = 'STORING_FAVORITE_IN_PROGRESS';
export const STORING_FAVORITE_COMPLETED = 'STORING_FAVORITE_COMPLETED';
export const STORE_FAVORITES = 'STORE_FAVORITES';