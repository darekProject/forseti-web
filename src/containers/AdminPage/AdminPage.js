import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import User from "../../comonents/UsersDTO/UserDTO";
import {getAdminPermission} from "../../utils/utlis";

import './AdminPage.css'
import ConfirmDeleteUserModal from './ModalConfirmDelete'

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            username: '',
            modalVisible: false,
            filteredUsers: [],
            filterActive: false
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
            const users = [];

            nextProps.allUsers.map(user => {
                if (user) {
                    users.push(user);
                }
            });
            this.setState({users})
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    removeUser = username => {
        const {users} = this.state;
        const userIndex = users.findIndex(user => user === username);
        users.splice(userIndex, 1);
        this.props.deleteUser(username);
        this.setState({users});
    };

    showDTOUser = username => {
        this.props.history.push(`/admin/user/${username}`);
    };

    renderUsers = () => {
        const {users, filteredUsers, filterActive} = this.state;
        if (users && !filterActive) {
            return users.map(user => {
                const props = {
                    userName: user,
                    removeUser: username => this.showModalToConfirmDel(username),
                    showDTOUser: username => this.showDTOUser(username)
                };
                return <User {...props}/>
            });
        } else {
            return filteredUsers.map(user => {
                const props = {
                    userName: user,
                    removeUser: username => this.showModalToConfirmDel(username),
                    showDTOUser: username => this.showDTOUser(username)
                };
                return <User {...props}/>
            });
        }
    };

    showModalToConfirmDel = username => {
        this.setState({username}, () => {
            this.switchModal();
        })
    };

    switchModal = () => {
        const {modalVisible} = this.state;
        this.setState({modalVisible: !modalVisible});
    };

    modalBackdropClicked = () => {
        this.setState({modalVisible: false});
    };

    filterUsers = event => {
        const {users} = this.state;
        if (event.target.value !== '') {
            const rightUser = users.filter(user => user.toLowerCase().includes(event.target.value.toLowerCase()));
            this.setState({filteredUsers: rightUser, filterActive: true});
        } else {
            this.setState({filterActive: false});
        }

    };

    renderModal = () => {
        return <ConfirmDeleteUserModal modalVisible={this.state.modalVisible}
                                       modalBackdropClicked={this.modalBackdropClicked}
                                       switchModal={this.switchModal}
                                       userName={this.state.username}
                                       removeUser={username => this.removeUser(username)}/>
    };

    render() {
        return (
            <div className="container-fluid users">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 users-title filters">
                            <h1>All Users:</h1>
                            <form className="filter-name">
                                <label>Find user: </label>
                                <input type="text" className="filter-input"
                                       onChange={(event) => this.filterUsers(event)}/>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        {this.renderUsers()}
                    </div>
                </div>
                {this.renderModal()}
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

export default connect(mapStateToProps, actions)(AdminPage)

