import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../Global/Input';
import Button from '../Global/Button';

import FormValidator from '../../validation/validator';
import { notEmpty, passwordValid } from '../../validation/validationRules';
import { createValidationObject } from '../../helpers/validationHelpers';

import { login } from '../../store/actions/authActions';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.initializeValidator();

        this.state = {
            loginCredential: '',
            loginCredentialVisited: '',
            password: '',
            passwordVisited: false,
            firstSubmit: true,
            validation: this.validator.valid()
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.history.replace('/');
        }
    }
    componentDidUpdate(prevProps){
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.history.replace('/');
        }
    }

    render(){
        const { validation, loginCredential, loginCredentialVisited, password, passwordVisited, firstSubmit } = this.state;
        const { loggingIn, error } = this.props;
        
        const validationFields = createValidationObject(
            validation, 
            firstSubmit, 
            ['loginCredential', 'password'], 
            [loginCredentialVisited, passwordVisited]
        );
        return (
            <React.Fragment>
                <div className="login-form">
                    <h1 className="login-form__title">
                        Login
                    </h1>
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={error === 404 || validationFields.loginCredential}
                        validationMessage={error === 404 ? 'Email/username you entered is not correct!' : (validationFields.loginCredential ? validation.loginCredential.message : null)}
                        placeholder="Email/Username*"
                        name="loginCredential"
                        value={loginCredential}
                        type="loginCredential"
                    />
                   <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={error === 401 || validationFields.password}
                        validationMessage={error === 401 ? 'The password you entered is not correct!' : (validationFields.password ? validation.password.message : null)}
                        placeholder="Password*"
                        name="password"
                        value={password}
                        type="password"
                    />
                </div>
                <p id={'register'} onClick={this.props.changeForm} className="login__forgot-password" >
                    Don't have an account? Register here!
                </p>
                <Button loading={loggingIn} onClick={this.login} disabled={!validationFields.isValid && !firstSubmit} classes="button--login" text={'Login'} color="yellow" />
            </React.Fragment>
        );
    }

    onChange = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    onBlur = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    login = (event) => {
        event.preventDefault();
        this.setState({
            firstSubmit: false
        }, () => {
            const isValid = this.validateForm();
            if(isValid){
                const { loginCredential, password } = this.state;
                this.props.login(loginCredential, loginCredential, password);
            }
        })
    }

    initializeValidator = () => {
        this.validator = new FormValidator([
            notEmpty('loginCredential', 'Email/username can\'t be empty!'),
            notEmpty('password', 'Password can\'t be empty!'),
            passwordValid('password', 'Password has to be at least 8 characters long!')
        ])
    }

    validateForm = () => {
        const validation = this.validator.validate(this.state);
        this.setState({
            validation: validation
        })
        return validation.isValid;
    }
}

const mapStateToProps = (state) => {
    return {
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
        registering: state.auth.registering
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, username, password) => { dispatch(login(email, username, password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));