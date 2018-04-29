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

    render() {
        const title = 'Get information about account number';

        return <Fragment>
            <Search title={title} handleSearch={({number}) => this.handleFromSearch({number})}/>
            <InfoPerNumber/>
            <Comments/>
        </Fragment>
    }
}

export default connect(null, actions)(ViewInfo);