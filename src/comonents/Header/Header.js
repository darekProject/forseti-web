import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './Header.css';
import {getAdminPermission, getToken, getUserName} from "../../utils/utlis";

class Header extends Component {

    renderUserBox = () => {
        const userName = getUserName();
        let userString = '';
        let dropdownLink = '';

        if (userName) {
            userString = <Fragment>
                <div className="username">{userName}</div>
            </Fragment>;
        } else {
            userString = <Fragment><img src="images/user-icon.png" alt=""/></Fragment>;
        }

        if (this.props.authenticated) {
            dropdownLink = <Link className="nav-link" onClick={() => this.props.signOutUser()} to="/">Sign out</Link>
        } else {
            dropdownLink = <Fragment>
                <Link className="nav-link" to="/signin">Sign in</Link>
                <Link className="nav-link" to="/signup">Sign up</Link>
            </Fragment>
        }

        return (<Fragment>
                <a className="nav-link dropdown-toggle user" href="" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {userString}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <span className="arrow-user"></span>
                    {dropdownLink}
                </div>
            </Fragment>
        )
    };

    render() {
        return (
            <nav className="navbar navbar-toggleable-md">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">FORSETI</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav menu">
                        <li className="nav-item">
                            <a className="nav-link" href="/getinfo">Check number</a>
                        </li>
                        <li className="nav-item">
                            {getToken() ? <a className="nav-link" href="/getactivities">Activities</a> : null}
                        </li>
                        <li className="nav-item">
                            {getAdminPermission() ? <a className="nav-link" href="/admin/getUser">Users</a> : null}
                        </li>
                    </ul>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                {this.renderUserBox()}
                            </li>
                        </ul>
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