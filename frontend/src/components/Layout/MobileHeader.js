import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions/authActions';


import hamburger from '../../assets/icons/hamburger.svg';
import x from '../../assets/icons/x.svg';

class MobileHeader extends Component {
    state = {
        open: false
    }
    render() {
        const activePath = this.props.location.pathname;
        const { isLoggedIn } = this.props;
        return (
            <div id="mobile-header" className="mobile-header">

                <Link to="/">
                    <h1>
                        POKEDEX
                    </h1>
                </Link>

                <img onClick={() => { this.setHamburgerOpen(true) }} src={hamburger} alt="hamburger" className="" />

                <div className={`hamburger ${this.state.open ? 'hamburger--open' : ''}`}>
                    <div onClick={() => { this.setHamburgerOpen(false) }} className={`hamburger__backdrop ${this.state.open ? 'hamburger__backdrop--open' : ''}`} />
                    <div className="hamburger__main">
                        <h1>
                            POKEDEX
                        </h1>

                        <img onClick={() => { this.setHamburgerOpen(false) }} src={x} alt="close" className="hamburger__close" />
                        <div className="hamburger__links">

                            <Link to="/">
                                <div className={`hamburger__link ${activePath === '/' ? 'hamburger__link--active' : ''}`}>
                                    Home
                                </div>
                            </Link>
                            {!isLoggedIn ?
                                <React.Fragment>
                                    <Link to="/login">
                                        <div className={`hamburger__link ${activePath.startsWith('/login') ? 'hamburger__link--active' : ''}`}>
                                            Login
                                        </div>
                                    </Link>

                                    <Link to="/register">
                                        <div className={`hamburger__link ${activePath.startsWith('/register') ? 'hamburger__link--active' : ''}`}>
                                            Register
                                        </div>
                                    </Link>
                                </React.Fragment> :
                                <React.Fragment>
                                    <Link to="/favorites">
                                        <div className={`hamburger__link ${activePath.startsWith('/favorites') ? 'hamburger__link--active' : ''}`}>
                                            Favorites
                                </div>
                                    </Link>
                                    <div onClick={this.props.logout} className={`hamburger__link`}>
                                        Logout
                                    </div>
                                </React.Fragment>}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    setHamburgerOpen = (isOpen) => {
        this.setState({
            open: isOpen
        })
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MobileHeader));