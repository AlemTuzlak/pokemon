import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import { removeAuthErrors } from '../../store/actions/authActions';

class LoginPage extends Component {
    state = {
        form: ''
    }

    componentDidMount() {
        if(this.props.history.location.pathname.includes('register')){
            this.setState({
                form: 'register'
            })
        }
        else{
            this.setState({
                form: 'login'
            })
        }
    }

    render() {
        
        const { error } = this.props;

        return (
                <div className="login">
                    {this.state.form === 'login' ?
                    <LoginForm changeForm={this.changeForm} removeAuthErrors={this.props.removeAuthErrors} error={error} isLoginForm={this.isLoginForm}  /> :
                    <RegistrationForm changeForm={this.changeForm} removeAuthErrors={this.props.removeAuthErrors} error={error} isLoginForm={this.isLoginForm} />
                    }
                </div>
        );
    }

    changeForm = (event) => {
        this.setState({
            form: event.target.id
        })
    }
    isLoginForm = () => {
        const { form } = this.state;

        return (form === 'login' || form === '')
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isLoggedIn: state.auth.isLoggedIn,
        registering: state.auth.registering,
        loggingIn: state.auth.loggingIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeAuthErrors: () => { dispatch(removeAuthErrors()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));