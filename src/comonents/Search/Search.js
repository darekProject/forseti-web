import React, {Component, Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {compose} from 'redux';

import './Search.css';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <Fragment>
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
            <span className="error-info">{warning}</span>))}
    </Fragment>
);

class Search extends Component {

    onSubmitForm = formProps => {
        this.props.handleSearch(formProps);
    };

    render() {
        console.log(this.props);
        const {handleSubmit} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 search-wrapper">
                        <h2>{this.props.title}</h2>
                        <form id="search" onSubmit={handleSubmit(this.onSubmitForm)}>
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
    }
    if (values.number && values.number.trim().split(" ").join('').length !== 26) {
        errors.number = 'The number is incorrect!'
    }
    if (values.number) {
        const regexNumber = /^[0-9]*$/;
        if (!regexNumber.test(values.number.trim().split(" ").join(''))) {
            errors.number = 'Account number have only number!'
        }
    }
    return errors;
};

// const reduxFormSearch = reduxForm({
//     form: `search${Math.random()}`,
//     validate
// })(Search);
//
// export default (reduxFormSearch);
export default compose(connect(null, actions), reduxForm({form: 'searchNumber', validate}))(Search);