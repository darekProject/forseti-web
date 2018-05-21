import React, {Component, Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from 'react-bootstrap4-modal';
import * as actions from "../../actions";
import {connect} from "react-redux";

import './CommentsModal.css'

class CommentsModal extends Component {

    renderField = ({input, label, type, meta: {touched, error, warning}}) => (
        <Fragment>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
                <span className="error-info">{warning}</span>))}
        </Fragment>
    );

    renderFieldText = ({input, label, type, meta: {touched, error, warning}}) => (
        <Fragment>
            <textarea {...input} placeholder={label} type={type}></textarea>
            {touched && ((error && <span className="error-data">{error}</span>) || (warning &&
                <span className="error-data">{warning}</span>))}
        </Fragment>
    );

    render() {
        const {handleSubmit} = this.props;

        return (
            <Modal visible={this.props.modalVisible} onClickBackdrop={() => this.props.modalBackdropClicked()}>
                <div className="modal-header">
                    <h5 className="modal-title">Add comments!</h5>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <form id="add-comment"
                              onSubmit={handleSubmit((values) => this.props.handleSubmitAddComments(values))}>
                            <div className="group-wrapper">
                                <label>Account`s number:</label>
                                <div>
                                    <Field type="text"
                                           name="number"
                                           component={this.renderField}
                                           value={this.props.accountNumber}
                                           label="Account number..."/>
                                </div>
                            </div>
                            <div className="group-wrapper">
                                <label>Your comments: </label>
                                <div>
                                    <Field type="text"
                                           name="comment"
                                           component={this.renderFieldText}
                                           label="Add your comment..."/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">ADD</button>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={() => this.props.switchModal()}>
                        CANCEL
                    </button>
                </div>
            </Modal>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.number) {
        errors.number = 'Give the number'
    } else if (!values.comment) {
        errors.comment = 'Give a message!';
    }
    return errors
};

const reduxFormAddComments = reduxForm({
    form: 'search',
    validate,
})(CommentsModal);

export default connect(null, actions)(reduxFormAddComments);