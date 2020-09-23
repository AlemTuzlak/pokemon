import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Global/Input';
import Button from '../Global/Button';

import FormValidator from '../../validation/validator';
import { notEmpty, validEmailFormat, isAlphanumeric, passwordMatch, passwordValid } from '../../validation/validationRules';
import { createValidationObject } from '../../helpers/validationHelpers';
import { register } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.initializeValidator();

        this.state = {
            email: '',
            emailVisited: false,
            username: '',
            usernameVisited: false,
            password: '',
            passwordVisited: false,
            confirmPassword: '',
            confirmPasswordVisited: false,
            firstSubmit: true,
            validation: this.validator.valid()
        }
    }

    render() {
        const { validation, email, emailVisited, username, usernameVisited, password, passwordVisited, confirmPassword, confirmPasswordVisited, firstSubmit } = this.state;
        const { registering, error, errorData } = this.props;
        
        const validationFields = createValidationObject(
            validation, 
            firstSubmit, 
            ['email', 'username', 'password', 'confirmPassword'], 
            [emailVisited, usernameVisited, passwordVisited, confirmPasswordVisited]
        );
        
        return (
            <React.Fragment>
                <div className="registration-form">
                    <h1 className="registration-form__title">
                        Register
                    </h1>
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={(error === 401 && errorData && errorData.includes('username')) || validationFields.username}
                        validationMessage={(error === 401 && errorData && errorData.includes('username')) ? 'Email/Username already exists' : (validationFields.username ? validation.username.message : null)}
                        placeholder="Username*"
                        name="username"
                        value={username}
                         />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={(error === 401 && errorData && errorData.includes('email')) || validationFields.email}
                        validationMessage={(error === 401 && errorData && errorData.includes('email')) ? 'Email/Username already exists' : (validationFields.email ? validation.email.message : null)}
                        placeholder="Email*"
                        name="email"
                        value={email}
                        type="email"
                       
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.password}
                        validationMessage={validationFields.password ? validation.password.message : null}
                        placeholder="Password*"
                        name="password"
                        value={password}
                        type="password"
                         />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.confirmPassword}
                        validationMessage={validationFields.confirmPassword ? validation.confirmPassword.message : null}
                        placeholder="Confirm Password*"
                        name="confirmPassword"
                        value={confirmPassword}
                        type="password"
                         />
                </div>

                <p id={'login'} onClick={this.props.changeForm} className="login__forgot-password" >
                    Already have an account? Log in here!
                </p>

                <Button loading={registering} onClick={this.register} disabled={!validationFields.isValid && !firstSubmit} classes="button--login" text={"Register"} color="yellow" />
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

    register = (event) => {
        event.preventDefault();
        this.setState({
            firstSubmit: false
        }, () => {
            const isValid = this.validateForm();
            if(isValid){
                const { email, username, password } = this.state;
                this.props.register(email, username, password);
            }
        })
    }

    initializeValidator = () => {
        this.validator = new FormValidator([
            notEmpty('email', 'Email can\'t be empty!'),
            validEmailFormat('email', 'The input you provided is not a valid email!'),
            notEmpty('username', 'Username can\'t be empty!'),
            isAlphanumeric('username', 'Username can contain only letters and numbers!'),
            notEmpty('password', 'Password can\'t be empty!'),
            notEmpty('confirmPassword', 'Password confirmation can\'t be empty!'),
            passwordMatch('confirmPassword', this.state, 'Passwords must match!'),
            passwordValid('password', 'Password must be at least 8 characters long'),
            passwordValid('confirmPassword', 'Password confirmation must be at least 8 characters long')
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
        registering: state.auth.registering,
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
        errorData: state.auth.errorData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, username, password) => { dispatch(register(email, username, password))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));