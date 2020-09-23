import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllPokemon } from '../../store/actions/pokemonActions';

import loader from '../../assets/animations/loader-b.svg';

class HomePage extends Component {
    state = {
        page: 1,
        perPage: 16
    }
    componentDidMount() {
        this.props.fetchAllPokemon(this.state.page, this.state.perPage);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.page !== this.state.page ||prevState.perPage !== this.state.perPage)
            this.props.fetchAllPokemon(this.state.page, this.state.perPage);
    }
    render() {
        const { pokemon, fetchingAllPokemon, totalPokemon } = this.props;
        return (
            <div className="home">
                {
                    fetchingAllPokemon ? <img src={loader} alt="loader" className="home__loader" /> : 
                    <React.Fragment>
                            
                            <h1 className="home__title">
                                Per page:
                                <select className="home__select" onChange={this.perPageChange} value={this.state.perPage}>
                                    <option value={4}>4</option>
                                    <option value={8}>8</option>
                                    <option value={16}>16</option>
                                    <option value={32}>32</option>
                                    <option value={64}>64</option>
                                    <option value={128}>128</option>
                                </select>
                            </h1>
                            <h1 className="home__title">
                                You are viewing {(this.state.page - 1) * this.state.perPage} - {(this.state.page * this.state.perPage) < totalPokemon ? (this.state.page * this.state.perPage) : totalPokemon} of {totalPokemon} pokemon
                            </h1>
                        <div className="home__grid">
                            
                            {pokemon.map(poke => {
                                return <Link key={poke.name} state={{ name: poke.name }} className="home__link" to={{ pathname: `/pokemon/${poke.name}`, state: { name: poke.name }}}>
                                    <div className="home__square">
                                        {poke.name}
                                    </div>
                                </Link>
                            })}
                        </div>
                            <div className="home__pages">
                                {this.createPagination()}
                            </div>
                    </React.Fragment>
                }
            </div>
        );
    }
    createPagination = () => {
        let options = [];
        const pages = Math.ceil(this.props.totalPokemon / this.state.perPage);
        
        options.push(
            <div key={'<<'} onClick={() => { this.onPageChange(1) }} className="home__page">
                {`<<`}
            </div>
        );
        if(this.state.page !== 1){
            options.push(
                <div key={'<'} onClick={() => { this.onPageChange(this.state.page - 1) }} className="home__page">
                    {`<`}
                </div>
            );
        }
        if (this.state.page !== pages) {
            options.push(
                <div key={'>'} onClick={() => { this.onPageChange(this.state.page + 1) }} className="home__page">
                    {`>`}
                </div>
            );
        }
        options.push(
            <div key={'>>'} onClick={() => { this.onPageChange(pages) }} className="home__page">
                {`>>`}
            </div>
        );

        return options;
    }
   
    onPageChange = (page) => {
        this.setState({
            page: page
        })
    }

    perPageChange = (event) => {
        this.setState({
            perPage: event.target.value,
            page: 1
        })
    }
  
}
const mapStateToProps = (state) => {
    return {
       pokemon: state.pokemon.allPokemon,
       fetchingAllPokemon: state.pokemon.fetchingAllPokemon,
        totalPokemon: state.pokemon.totalPokemon
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPokemon: (page, perPage) => { dispatch(fetchAllPokemon(page, perPage)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));