import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions'

import './SignUp.css';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="input-box">
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span className="error-input">{error}</span>) || (warning &&
            <span className="error-input">{warning}</span>))}
    </div>
);

class SignUp extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    handleFormSubmit = ({email, password, confirmPassword}) => {
        this.props.signUpUser({email, password});
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
                                    <Link to="/signin">Sign In </Link>
                                    <span> | </span>
                                    <p> Sign Up</p>
                                </div>
                            </div>
                            <form id="signup" className="sign-style"
                                  onSubmit={handleSubmit((values) => this.handleFormSubmit(values))}>
                                <Field type="text" name="email" component={renderField} label="Add your email"/>
                                <Field type="password" name="password" component={renderField}
                                       label="Add your password"/>
                                <Field type="password" name="confirmPassword" component={renderField}
                                       label="Confirm your password"/>
                                <button type="submit" className="btn-sign">Sign Up</button>
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

    if (!values.email) {
        errors.email = 'Add your email!'
    } else if (!values.password) {
        errors.password = 'Add your password!'
    } else if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm your password!'
    } else if (values.confirmPassword) {
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'The repeated password is incorrect!'
        }
    }

    return errors;
};

const reduxFormSignUp = reduxForm({
    form: 'signup',
    validate
})(SignUp);

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated,
        errorMessage: state.user.error
    }
};

export default connect(mapStateToProps, actions)(reduxFormSignUp);
