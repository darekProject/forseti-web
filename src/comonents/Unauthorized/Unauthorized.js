import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Unauthorized.css';

class Unauthorized extends Component {

    renderBoxUnAuth = () => {
        const {unAuth} = this.props;

        if (true) {
            return < div className={this.switchUnAuthBox()}>
                <p>Unauthotized! You have to log in!</p>
            </div>
        }
        return null;
    };

    render() {
        return this.renderBoxUnAuth()
    }
}

const mapStateToProps = state => {
    return {
        unAuth: state.user.unauthorized
    }
};

export default connect(mapStateToProps)(Unauthorized);