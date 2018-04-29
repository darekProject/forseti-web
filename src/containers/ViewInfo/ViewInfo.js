import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import Search from "../../comonents/Search/Search";
import InfoPerNumber from "../../comonents/InfoPerNumber/InfoPerNumber";
import Comments from "../../comonents/Comments/Comments";

class ViewInfo extends Component {

    handleFromSearch = ({number}) => {
        this.props.getInfoAboutNumber({number});
    };

    renderComments = () => {
        return this.props.infoData ? <Comments comments={this.props.infoData.comments}/> : null
    };

    render() {
        const title = 'Get information about account number';

        return <Fragment>
            <Search title={title} handleSearch={({number}) => this.handleFromSearch({number})}/>
            <InfoPerNumber bankName='BZWBK' departueName='Oddział w Nowym Targu nr 12'/>
            {this.renderComments()}
        </Fragment>
    }
}

const mapStateToProps = store => {
    return {
        infoData: store.number.infoData
    }
};

export default connect(mapStateToProps, actions)(ViewInfo);