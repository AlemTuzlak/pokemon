import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../store/router/history';
import { addFavorite, fetchSinglePokemon, removeFavorite, removePokemon } from '../../store/actions/pokemonActions';
import loader from '../../assets/animations/loader-b.svg';
import Button from '../Global/Button';

class PokemonPage extends Component {

    componentDidMount() {
        if (history.location.state && history.location.state.name)
            this.props.fetchSinglePokemon(history.location.state.name)
    }

    componentWillUnmount() {
        this.props.removePokemon();
    }
    render() {
        const { pokemon, fetchingSinglePokemon, favorites, storingFavorites, isLoggedIn } = this.props;

        return (
            <div className="pokemon">
                {fetchingSinglePokemon ? <img className="pokemon__loader" src={loader} alt="loader" /> :
                    <React.Fragment>
                        <img className="pokemon__image" src={pokemon?.sprites?.other['official-artwork']?.front_default} alt="pokemon" />
                        <div className="pokemon__info">
                            <h1 className="pokemon__title">
                                #{pokemon?.id} - {pokemon?.name}
                            </h1>
                            <hr />
                            <div className="pokemon__all-info">
                                <div className="pokemon__group">
                                    <h1 className="pokemon__subtitle">
                                        Stats:
                                    </h1>
                                    {pokemon?.stats?.length ? pokemon.stats.map(stat => {
                                        return <p key={stat?.stat?.name} className="pokemon__stat">
                                            <span className="bold">{stat?.stat?.name}:</span> {stat.base_stat}
                                        </p>
                                    }) : null}
                                </div>
                                <div className="pokemon__group">
                                    <h1 className="pokemon__subtitle">
                                        Types:
                                    </h1>
                                    {pokemon?.types?.length ? pokemon.types.map((type, i) => {
                                        return <p key={type?.type?.name} className="pokemon__stat">
                                            <span className="bold">{type?.type?.name}</span>
                                        </p>
                                    }) : null}
                                </div>
                                <div className="pokemon__group">
                                    <h1 className="pokemon__subtitle">
                                        Abilities:
                                    </h1>
                                    {pokemon?.abilities?.length ? pokemon.abilities.map((ability, i) => {
                                        return <p key={ability?.ability?.name} className="pokemon__stat">
                                            <span className="bold">{ability?.ability?.name}</span>
                                        </p>
                                    }) : null}
                                </div>
                                <div className="pokemon__group">
                                    <h1 className="pokemon__subtitle">
                                        Size:
                                    </h1>
                                    <p className="pokemon__stat">
                                        <span className="bold">Weight:</span> {pokemon.weight} kg
                                    </p>
                                    <p className="pokemon__stat">
                                        <span className="bold">Height:</span> {pokemon.height} m
                                    </p>
                                </div>
                            </div>
                            <hr />
                            {isLoggedIn ? <Button classes="pokemon__button" loading={storingFavorites} onClick={favorites.includes(pokemon.name) ? this.removeFromFavorites : this.addToFavorites} text={favorites.includes(pokemon.name) ? 'Remove from favorites' : 'Add to favorites'} color="yellow-dark" /> : <h1>Log in to add to favorites!</h1>}
                        </div>
                    </React.Fragment>}

            </div>
        );
    }

    removeFromFavorites = () => {
        this.props.removeFavorites(this.props.pokemon?.name);
    }

    addToFavorites = () => {
        this.props.addToFavorites(this.props.pokemon?.name);
    }
}
const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon.pokemon,
        fetchingSinglePokemon: state.pokemon.fetchingSinglePokemon,
        favorites: state.pokemon.favorites,
        storingFavorites: state.pokemon.storingFavorites,
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSinglePokemon: (name) => { dispatch(fetchSinglePokemon(name)) },
        removePokemon: () => { dispatch(removePokemon()) },
        addToFavorites: (name) => { dispatch(addFavorite(name)) },
        removeFavorites: (name) => { dispatch(removeFavorite(name))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonPage));