import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import User from "../../comonents/UsersDTO/UserDTO";


class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }

    componentWillMount() {
        if (!this.props.isAdmin) {
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

    renderUsers = () => {
        const {users} = this.props;
        if (users) {
            return users.map(user => {
                const props = {
                    userName: user.userName
                };
                return <User {...props}/>
            });
        }
    };

    render() {
        return (
            <div className="container-fluid users">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>All Users:</h1>
                    </div>
                </div>
                <div className="row">
                    {this.renderUsers()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.user.admin,
        allUsers: state.admin.allUsers
    }
};

export default connect(mapStateToProps, actions)(AdminPage);

