import {
    FETCHING_ALL_POKEMON_IN_PROGRESS,
    STORE_ALL_POKEMON,
    FETCHING_ALL_POKEMON_COMPLETED,
    FETCHING_SINGLE_POKEMON_IN_PROGRESS,
    FETCHING_SINGLE_POKEMON_COMPLETED,
    STORE_SINGLE_POKEMON,
    STORING_FAVORITE_IN_PROGRESS,
    STORING_FAVORITE_COMPLETED,
    STORE_FAVORITES
} from '../constants';

const initState = {
    fetchingAllPokemon: false,
    allPokemon: [],
    totalPokemon: 0,
    pokemon: {},
    fetchingSinglePokemon: false,
    storingFavorites: false,
    favorites: []
}

const pokemonReducer = (state = initState, action) => {

    switch (action.type) {

        case FETCHING_ALL_POKEMON_IN_PROGRESS: {
            return {
                ...state,
                fetchingAllPokemon: true
            }
        }
        case STORE_ALL_POKEMON: {
            return {
                ...state,
                allPokemon: action.payload.pokemon,
                totalPokemon: action.payload.total
            }
        }
        case FETCHING_ALL_POKEMON_COMPLETED: {
            return {
                ...state,
                fetchingAllPokemon: false
            }
        }
        case FETCHING_SINGLE_POKEMON_IN_PROGRESS: {
            return {
                ...state,
                fetchingSinglePokemon: true
            }
        }
        case FETCHING_SINGLE_POKEMON_COMPLETED: {
            return {
                ...state,
                fetchingSinglePokemon: false
            }
        }
        case STORE_SINGLE_POKEMON: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case STORING_FAVORITE_IN_PROGRESS: {
            return {
                ...state,
                storingFavorites: true
            }
        }
        case STORING_FAVORITE_COMPLETED: {
            return {
                ...state,
                storingFavorites: false
            }
        }
        case STORE_FAVORITES: {
            return {
                ...state,
                favorites: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default pokemonReducer;