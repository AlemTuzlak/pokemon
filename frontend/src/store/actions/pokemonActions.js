import {
    ACTION_FETCHING_ALL_POKEMON_IN_PROGRESS,
    ACTION_STORE_ALL_POKEMON,
    ACTION_FETCHING_ALL_POKEMON_COMPLETED,
    ACTION_FETCHING_SINGLE_POKEMON_IN_PROGRESS,
    ACTION_FETCHING_SINGLE_POKEMON_COMPLETED,
    ACTION_STORE_SINGLE_POKEMON,
    ACTION_STORING_FAVORITE_IN_PROGRESS,
    ACTION_STORING_FAVORITE_COMPLETED,
    ACTION_STORE_FAVORITES
} from './pokemonActionsList';

import api from '../../api';

export const fetchAllPokemon = (page, perPage) => {
    return async (dispatch, getState) => {
        try {
           dispatch(ACTION_FETCHING_ALL_POKEMON_IN_PROGRESS());
            const response = await api.getAllPokemon(page, perPage);
            if(response?.data) {
                dispatch(ACTION_FETCHING_ALL_POKEMON_COMPLETED());
                dispatch(ACTION_STORE_ALL_POKEMON(response.data.pokemon, response.data.totalPokemon));
            }
        } catch (error) {
            dispatch(ACTION_FETCHING_ALL_POKEMON_COMPLETED());
        }
    }
}

export const fetchSinglePokemon = (pokemon) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_FETCHING_SINGLE_POKEMON_IN_PROGRESS());
            const response = await api.fetchSinglePokemon(pokemon);
            if (response?.data) {
                dispatch(ACTION_FETCHING_SINGLE_POKEMON_COMPLETED());
                dispatch(ACTION_STORE_SINGLE_POKEMON(response.data.pokemon));
            }
        } catch (error) {
            dispatch(ACTION_FETCHING_SINGLE_POKEMON_COMPLETED());
        }
    }
}
export const removePokemon = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_SINGLE_POKEMON({}));
    }
}

export const addFavorite = (pokemon) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_STORING_FAVORITE_IN_PROGRESS());
            const response = await api.storeFavorite(pokemon);
            if (response?.data) {
                dispatch(ACTION_STORING_FAVORITE_COMPLETED());
                dispatch(ACTION_STORE_FAVORITES(response.data.favorites));
            }
        } catch (error) {
            dispatch(ACTION_STORING_FAVORITE_COMPLETED());
        }
    }
}

export const removeFavorite = (pokemon) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_STORING_FAVORITE_IN_PROGRESS());
            const response = await api.removeFavorite(pokemon);
            if (response?.data) {
                dispatch(ACTION_STORING_FAVORITE_COMPLETED());
                dispatch(ACTION_STORE_FAVORITES(response.data.favorites));
            }
        } catch (error) {
            dispatch(ACTION_STORING_FAVORITE_COMPLETED());
        }
    }
}