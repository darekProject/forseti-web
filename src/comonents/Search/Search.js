import React, {Component, Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import './Search.css';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <Fragment>
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
            <span className="error-info">{warning}</span>))}
    </Fragment>
);

class Search extends Component {

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 search-wrapper">
                        <h2>{this.props.title}</h2>
                        <form id="search" onSubmit={handleSubmit((values) => this.props.handleSearch(values))}>
                            <Field type="text"
                                   name="number"
                                   component={renderField}
                                   label="Account number"/>
                            <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.number) {
        errors.number = 'Give the number'
    } else if (values.number.trim().length !== 16) {
        errors.number = 'Account number should have 16 number!'
    } else if (values.number) {
        const regexEmail = /\d+/;
        if (!regexEmail.test(values.number.trim())) {
            errors.number = 'Account number have only number!'
        }
    }
    return errors
};

const reduxFormSearch = reduxForm({
    form: 'search',
    validate,
})(Search);

export default connect(null, actions)(reduxFormSearch);