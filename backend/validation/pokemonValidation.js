const { body, param } = require('express-validator');

const addFavorite = [
    body('name').notEmpty()
];

const removeFavorite = [
   
];
const getSinglePokemon = [
    param('name').notEmpty()
]
const pokemonValidator = {
    addFavorite,
    removeFavorite,
    getSinglePokemon
}

module.exports = pokemonValidator;