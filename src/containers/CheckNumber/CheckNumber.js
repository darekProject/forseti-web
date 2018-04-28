import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'

import Search from "../../comonents/Search/Search";
import NumberData from "../../comonents/NumberData/NumberData";

class CheckNumber extends Component {

    handleFromSearch = ({number}) => {
        this.props.getInfoAboutNumber({number});
    };

    handleSendThumbs = (value) => {
        this.props.sendThumbs(value);
    };

    render() {

        const {
            numData,
            numError,
            thumbsSet,
            thumbsSetError
        } = this.props;

        const props = {
            numData,
            numError,
            thumbsSet,
            thumbsSetError,
            setThumbs: (values) => this.handleSendThumbs(values)
        };

        return <Fragment>
            <Search handleSearch={({number}) => this.handleFromSearch({number})}/>
            <NumberData {...props}/>
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