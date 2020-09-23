import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
    componentDidMount(){
        if(!this.props.isLoggedIn){
            this.props.history.replace('/')
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps.isLoggedIn && !this.props.isLoggedIn){
            this.props.history.replace('/login');
        }
    }
    render(){
        return <Route {...this.props} />
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(ProtectedRoute));