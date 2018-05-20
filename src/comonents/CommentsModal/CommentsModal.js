import React from 'react';
import Modal from 'react-bootstrap4-modal';

class Spacecraft extends React.Component {
    // event handling methods go here

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.modalVisible
        }
    }

    modalBackdropClicked = () => {
        this.setState({modalVisible: false});
    };

    render() {
        return (
            <Modal visible={this.state.modalVisible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header">
                    <h5 className="modal-title">Red Alert!</h5>
                </div>
                <div className="modal-body">
                    <p>Enemy vessel approaching!</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.onPanic}>
                        Panic
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.onFirePhasers}>
                        Fire phasers
                    </button>
                </div>
            </Modal>
        );
    }
}

export default Modal;