import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class FavoritesPage extends Component {

    componentDidMount() {

    }

    render() {
        const { favorites } = this.props;
        return (
            <div className="home">
                <div className="home__grid">
            
                    {favorites.map(poke => {
                        return <Link key={poke} state={{ name: poke }} className="home__link" to={{ pathname: `/pokemon/${poke}`, state: { name: poke } }}>
                            <div className="home__square">
                                {poke}
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        );
    }


}
const mapStateToProps = (state) => {
    return {
        favorites: state.pokemon.favorites
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritesPage));