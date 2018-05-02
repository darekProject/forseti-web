import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import PropTypes from 'prop-types';

import Search from "../../comonents/Search/Search";
import NumberData from "../../comonents/NumberData/NumberData";

class CheckNumber extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    static propTypes = {
        sendThumbs: PropTypes.func
    };

    static defaultProps = {
        sendThumbs: () => {
        }
    };

    getInitialState = () => {
        return {
            number: null
        }
    };

    handleFromSearch = ({number}) => {
        this.props.getThumbsByAccountNum({number});
        this.setState({number});
    };

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

        const searchProps = {
            title: 'Check account number',
            handleSearch: ({number}) => this.handleFromSearch({number})
        };

        return <Fragment>
            <Search  {...searchProps}/>
            <NumberData {...propsNumberData}/>
        </Fragment>
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