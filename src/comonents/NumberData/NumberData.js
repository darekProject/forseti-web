import React, {Component} from 'react';

import './NumberData.css';

class NumberData extends Component {

    renderMessageAfterSendThumbs() {
        if (this.props.thumbsSet === 200) {
            return <span className="success-info">Thumbs is added!!!</span>
        }

        if (this.props.thumbsSetError) {
            return <span className="error-info">Error during add thumbs!!!</span>
        }
    }

    renderNumData = () => {
        if (this.props.numData) {

            const thumbsUp = this.props.numData.thumbsUp;
            const thumbsDown = this.props.numData.thumbsDown;

            return <div className="data_box">
                <div onClick={() => this.props.setThumbs(1)}>
                    <span className="value">{thumbsUp}</span>
                    <i className="fas fa-thumbs-up"></i>
                </div>
                <div onClick={() => this.props.setThumbs(-1)}>
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
                    <div className="col-lg-12 flex-center">
                        {this.renderError()}
                    </div>
                    <div className="col-lg-12 flex-center">
                        {this.renderMessageAfterSendThumbs()}
                    </div>
                </div>
            </div>
        )
    }
}


export default NumberData;
