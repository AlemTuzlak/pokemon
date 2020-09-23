const User = require('../models/user');
const axios = require('axios');

const { authorized, entityExists } = require('../helpers/authHelpers');

//* GET /pokemon
exports.getAllPokemon = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.limit || 16;
  
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${(currentPage - 1) * perPage}`);
    
   
    
    res.status(200).json({
      message: 'Fetched pokemon successfully.',
      pokemon: response.data.results,
      totalPokemon: response.data.count
    });

  } catch (error) {
    next(error);
  }
};

exports.getSinglePokemon = async (req, res, next) => {
 const name = req.params.name;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    res.status(200).json({
      message: 'Fetched pokemon successfully.',
      pokemon: response.data
    });

  } catch (error) {
    next(error);
  }
};

//* POST /pokemon/favorites/add
exports.addFavoritePokemon = async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.userId);
    
    entityExists(user, 'User not valid.', 401);
    authorized(req.userId, user._id.toString(), 'This user is not allowed to edit favorites of another user!');

    if(user && user.pokemon && user.pokemon.length) {
        user.pokemon = [...user.pokemon, name];
    }
    else {
        user.pokemon = [name];
    }
    
    await user.save();
    
    res.status(201).json({
      message: 'User favorites edited successfully!',
      favorites: user.pokemon
    });

  } catch (err) {
    next(err);
  }
};

//* POST /pokemon/favorites/remove
exports.removeFavoritePokemon = async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.userId);

    entityExists(user, 'User not valid.', 401);
    authorized(req.userId, user._id.toString(), 'This user is not allowed to edit favorites of another user!');

    user.pokemon = user && user.pokemon && user.pokemon.length ? user.pokemon.filter(pokemon => pokemon !== name) : undefined;

    await user.save();

    res.status(201).json({
      message: 'User favorites edited successfully!',
      favorites: user.pokemon
    });

  } catch (err) {
    next(err);
  }
};