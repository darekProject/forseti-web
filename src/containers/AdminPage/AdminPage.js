import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import User from "../../comonents/UsersDTO/UserDTO";
import {getAdminPermission} from "../../utils/utlis";

import './AdminPage.css'

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }

    componentWillMount() {
        const isAdmin = getAdminPermission();
        if (!isAdmin) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allUsers) {
            this.setState({users: nextProps.allUsers})
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    removeUser = username => {
        const {allUsers} = this.state;
        const userIndex = allUsers.findIndex(user => user === username);
        allUsers.splice(userIndex, 1);

        this.setState({allUsers})
    };

    renderUsers = () => {
        const {users} = this.state;
        if (users) {
            return users.map(user => {
                const props = {
                    userName: user,
                    removeUser: username => this.renderUsers(username)
                };
                return <User {...props}/>
            });
        }
    };

    render() {
        return (
            <div className="container-fluid users">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 users-title">
                            <h1>All Users:</h1>
                        </div>
                    </div>
                    <div className="row">
                        {this.renderUsers()}
                    </div>
                </div>
            </div>
        )
    }
}

AdminPage.defaultProps = {
    isAdmin: true
};

const mapStateToProps = state => {
    return {
        isAdmin: state.user.admin,
        allUsers: state.admin.allUsers
    }
};

export default connect(mapStateToProps, actions)(AdminPage);

