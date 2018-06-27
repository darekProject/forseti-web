import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

import './SignUp.css';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="input-box">
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span className="error-input">{error}</span>) || (warning &&
            <span className="error-input">{warning}</span>))}
    </div>
);

class SignUp extends Component {

    static propTypes = {
        userAdded: PropTypes.bool,
        errorMessage: PropTypes.bool,
        signUpUser: PropTypes.func,
        handleSubmit: PropTypes.func
    };

    static defaultProps = {
        userAdded: false,
        errorMessage: false,
        signUpUser: () => {
        },
        handleSubmit: () => {
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.userAdded) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.props.clearErrorBuffor();
    }

    handleFormSubmit = ({username, email, password}) => {
        this.props.signUpUser({username, email, password});
    };

    renderError = () => {
        if (this.props.errorMessage) {
            return <span className='error-auth'>{this.props.errorMessage}</span>
        }
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
                                <Field type="text" name="username" component={renderField} label="Add your username"/>
                                <Field type="text" name="email" component={renderField} label="Add your email"/>
                                <Field type="password" name="password" component={renderField}
                                       label="Add your password"/>
                                <Field type="password" name="confirmPassword" component={renderField}
                                       label="Confirm your password"/>
                                <button type="submit" className="btn-sign">Sign Up</button>
                            </form>
                            {this.renderError()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.username) {
        errors.username = 'Add your username!'
    } else if (!values.email) {
        errors.email = 'Add your email!'
    } else if (values.email && !re.test(values.email)) {
        errors.email = 'Email is incorrect!'
    } else if (!values.password) {
        errors.password = 'Add your password!'
    } else if (values.password.length < 5) {
        errors.password = 'Password is to short!'
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
        userAdded: state.user.userAdded,
        errorMessage: state.user.error
    }
};

export default connect(mapStateToProps, actions)(reduxFormSignUp);
