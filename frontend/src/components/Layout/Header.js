import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions/authActions';

class Header extends Component {

    render() {
        const activePath = this.props.location.pathname;
        const { isLoggedIn } = this.props;
        return (
            <div id="header" className="header">
                <div className="header__logo_container">
                    <Link to="/">
                        Pokedex
                    </Link>
                </div>

                <div className="header__links">
                    <Link to="/">
                        <div className={`header__link ${activePath === '/' ? 'header__link--active' : ''}`}>
                            Home
                        </div>
                    </Link>

                    { !isLoggedIn ?
                        <React.Fragment>
                            <Link to="/login">
                                <div className={`header__link ${activePath.startsWith('/login') ? 'header__link--active' : ''}`}>
                                    Login
                                </div>
                            </Link>

                            <Link to="/register">
                                <div className={`header__link ${activePath.startsWith('/register') ? 'header__link--active' : ''}`}>
                                    Register
                                </div>
                            </Link>
                        </React.Fragment> :
                        <React.Fragment>
                            <Link to="/favorites">
                                <div className={`header__link ${activePath.startsWith('/favorites') ? 'header__link--active' : ''}`}>
                                    Favorites
                                </div>
                            </Link>
                            <div onClick={this.props.logout} className={`header__link`}>
                                Logout
                            </div>
                        </React.Fragment>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));