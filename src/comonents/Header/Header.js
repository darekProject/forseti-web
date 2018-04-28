import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './Header.css';

class Header extends Component {

    renderLinks = () => {
        if (this.props.authenticated) {
            return <Link className="nav-link" onClick={() => this.props.signOutUser()} to="/">Sign out</Link>
        } else {
            return <Fragment>
                <Link className="nav-link" to="/signin">Sign in</Link>
                <Link className="nav-link" to="/signup">Sign up</Link>
            </Fragment>
        }
    };

    render() {
        return (
            <nav className="navbar navbar-toggleable-md">
                <div className="container">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">FORSETI</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/checknumber">Get/Set Thumbs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/getinfo">Get Info</a>
                            </li>
                        </ul>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user"></i>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {this.renderLinks()}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated,
    }
};

export default connect(mapStateToProps, actions)(Header);