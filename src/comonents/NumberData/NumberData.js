import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './NumberData.css';

class NumberData extends Component {

    handleSendThumbs = (value) => {
        this.props.sendThumbs(value);
    };

    renderMessageAfterSendThumbs() {
        if (this.props.thumbsSet === 'OK') {
            return <span>Thumbs is added!!!</span>
        }

        if (this.props.thumbsSetError) {
            return <span className="error-info">Error during add thumbs!!!</span>
        }
    }

    renderNumData = () => {
        if (this.props.numData) {

            const thumbsUp = this.props.numData.up;
            const thumbsDown = this.props.numData.down;

            return <div className="data_box">
                <div onClick={() => this.handleSendThumbs(1)}>
                    <span className="value">{thumbsUp}</span>
                    <i className="fas fa-thumbs-up"></i>
                </div>
                <div onClick={() => this.handleSendThumbs(-1)}>
                    <span className="value">{thumbsDown}</span>
                    <i className="fas fa-thumbs-down"></i>
                </div>
            </div>
        }
    };

    renderError = () => {
        if (this.props.numError) {
            return <span className="error-number">Oopss! Something was wrong :(</span>
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {this.renderNumData()}
                    </div>
                    <div className="col-lg-12">
                        {this.renderError()}
                    </div>
                    <div className="col-lg-12">
                        {this.renderMessageAfterSendThumbs()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        numData: state.number.data,
        numError: state.number.error,
        thumbsSet: state.number.thumbsSet,
        thumbsSetError: state.number.thumbsSetError
    }
};

export default connect(mapStateToProps, actions)(NumberData);
