import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import history from './store/router/history';

import './App.css';

import FrontendLayout from './components/hocs/FrontendLayout';
import ProtectedRoute from './components/hocs/ProtectedRoute';
import HomePage from './components/Homepage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import PokemonPage from './components/PokemonPage/PokemonPage';

class App extends Component {

  componentDidMount(){
    
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/pokemon" component={FrontendLayout(HomePage)} />
          <Route exact path="/pokemon/:name" component={FrontendLayout(PokemonPage)} />
          <Route exact path="/login" component={FrontendLayout(LoginPage)} />
          <Route exact path="/register" component={FrontendLayout(LoginPage)} />
          <ProtectedRoute exact path="/favorites" component={FrontendLayout(FavoritesPage)} />

          <Route component={FrontendLayout(HomePage)} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
