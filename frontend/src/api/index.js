

import apiInstance from './apiConfig';

//* -------------------------------------------------------------- //
//*                    AUTHENTICATION ENDPOINTS                    //
//* -------------------------------------------------------------- //
function login(email, username, password) {
    const data = new FormData();
    data.append('email', email);
    data.append('username', username);
    data.append('password', password);

    return apiInstance.post('/auth/login', data);
}

function register(email, username, password) {
    const user = new FormData();
    user.append('email', email);
    user.append('username', username);
    user.append('password', password);
    return apiInstance.put('/auth/register', user);
}

function refreshToken(refreshToken) {
    const data = new FormData();
    data.append('refreshToken', refreshToken);
    
    return apiInstance.post('/auth/refresh', data);
}
//* -------------------------------------------------------------- //
//*                      POKEMON ENDPOINTS                         //
//* -------------------------------------------------------------- //
function getAllPokemon(page, perPage) {
    return apiInstance.get(`/pokemon?page=${page}&limit=${perPage}`);
}
function fetchSinglePokemon(name) {
    return apiInstance.get(`/pokemon/${name}`);
}
function storeFavorite(name) {
    const data = new FormData();
    data.append('name', name);
    return apiInstance.post('/pokemon/favorites/add', data)
}
function removeFavorite(name) {
    const data = new FormData();
    data.append('name', name);
    return apiInstance.post('/pokemon/favorites/remove', data)
}
const api = {
    login,
    register,
    refreshToken,
    getAllPokemon,
    fetchSinglePokemon,
    storeFavorite,
    removeFavorite
}

export default api;