const express = require('express');

const pokemonController = require('../controllers/pokemonController');
const { isAuth } = require('../middleware/is-auth');
const { isValidated } = require('../middleware/validaton');
const router = express.Router();
const pokemonValidator = require('../validation/pokemonValidation');

//*------------------- Routes -----------------------//
router.get('', pokemonController.getAllPokemon);
router.get('/:name', pokemonValidator.getSinglePokemon, isValidated, pokemonController.getSinglePokemon)
router.post('/favorites/add', isAuth, pokemonValidator.addFavorite, isValidated, pokemonController.addFavoritePokemon);
router.post('/favorites/remove', isAuth, pokemonValidator.removeFavorite, isValidated, pokemonController.removeFavoritePokemon);

module.exports = router;
