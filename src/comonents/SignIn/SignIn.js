import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../../actions'

import './SignIn.css';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="input-box">
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span className="error-input">{error}</span>) || (warning &&
            <span className="error-input">{warning}</span>))}
    </div>
);


class SignIn extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticated) {
            this.props.history.push('/checknumber');
        }
    }

    handleFormSubmit = ({username, password}) => {
        this.props.signInUser({username, password});
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="container-fluid box-sign">
                <div className="row">
                    <div className="col-lg-12 ">
                        <div className="sign-wrapper">
                            <div>
                                <h1 className="main-title">FORSETI</h1>
                                <div>
                                    <p> Sign In</p>
                                    <span> | </span>
                                    <Link to="/signup">Sign Up </Link>
                                </div>
                            </div>
                            <form id="signin" className="sign-style"
                                  onSubmit={handleSubmit((values) => this.handleFormSubmit(values))}>
                                <Field type="text" name="username" component={renderField} label="Username"/>
                                <Field type="password" name="password" component={renderField}
                                       label="Add your password"/>
                                <button type="submit" className="btn-sign">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Add your username!'
    } else if (!values.password) {
        errors.password = 'Add your password!'
    }

    return errors;
};

const reduxFormSignIn = reduxForm({
    form: 'signin',
    validate
})(SignIn);

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated,
        errorMessage: state.user.error
    }
};

export default connect(mapStateToProps, actions)(reduxFormSignIn);
