import authReducer from './authReducer';
import pokemonReducer from './pokemonReducer';

import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['token','refreshToken', 'isLoggedIn', 'user', 'userId']
}

const pokemonPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['favorites']
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    pokemon: persistReducer(pokemonPersistConfig, pokemonReducer)
})

export default rootReducer;