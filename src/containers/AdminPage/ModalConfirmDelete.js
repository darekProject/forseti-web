import React, {Component} from 'react';
import Modal from 'react-bootstrap4-modal';
import * as actions from "../../actions";
import {connect} from "react-redux";

import './ModalConfirmDelete.css'

class ModalConfirmDelete extends Component {

    removeUserOfDb = username => {
        this.props.removeUser(username);
        this.props.switchModal();
    };

    render() {
        return (
            <Modal visible={this.props.modalVisible} onClickBackdrop={() => this.props.modalBackdropClicked()}>
                <div className="modal-header">
                    <h5 className="modal-title">DELETE USER</h5>
                </div>
                <div className="modal-body delete-user">
                   <p>Are you sure that you want delete {this.props.userName}?</p>
                    <div className="confirm-btn">
                        <button className="btn btn-danger" onClick={() => this.removeUserOfDb(this.props.userName)}>YES</button>
                        <button className="btn btn-success" onClick={() => this.props.switchModal()}>NO</button>
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


export default connect(null, actions)(ModalConfirmDelete);