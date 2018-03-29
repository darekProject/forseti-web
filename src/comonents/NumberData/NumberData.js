import React, {Component} from 'react';
import {connect} from 'react-redux';

import './NumberData.css';

class NumberData extends Component {

    renderNumData = () => {
        if (this.props.numData) {

            const value_up = this.props.numData.up;
            const value_down = this.props.numData.down;

            return <div className="data_box">
                <div>
                    <span className="value">{value_up}</span>
                    <i className="fas fa-thumbs-up"></i>
                </div>
                <div>
                    <span className="value">{value_down}</span>
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        numData: state.number.data,
        numError: state.number.error
    }
};

export default connect(mapStateToProps)(NumberData);
