import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import PropTypes from 'prop-types';

import NumberData from "../../comonents/NumberData/NumberData";

class CheckNumber extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    static propTypes = {
        sendThumbs: PropTypes.func,
        getThumbsByAccountNum: PropTypes.func
    };

    static defaultProps = {
        sendThumbs: () => {
        },
        getThumbsByAccountNum: () => {
        }
    };

    getInitialState = () => {
        return {
            number: this.props.number
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.number) {
            this.setState({number: this.props.number});
        }
    }

    handleSendThumbs = (value) => {
        const number = this.state.number;
        value === 1 ? this.props.sendThumbs(number, 'UP') : this.props.sendThumbs(number, 'DOWN')
    };

    render() {

        const {
            numData,
            numError,
            thumbsSet,
            thumbsSetError
        } = this.props;

        const propsNumberData = {
            numData,
            numError,
            thumbsSet,
            thumbsSetError,
            setThumbs: (values) => this.handleSendThumbs(values)
        };

        return <NumberData {...propsNumberData}/>
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

export default connect(mapStateToProps, actions)(CheckNumber);