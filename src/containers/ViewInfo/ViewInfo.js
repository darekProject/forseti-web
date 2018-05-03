import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import {getDataPerNumber} from '../../utils/numberData';

import Search from "../../comonents/Search/Search";
import InfoPerNumber from "../../comonents/InfoPerNumber/InfoPerNumber";
import Comments from "../../comonents/Comments/Comments";

class ViewInfo extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            bankName: '',
            outpost: '',
            address: '',
            postal: '',
            phone: ''
        }
    };

    static propTypes = {
        getInfoAboutNumber: PropTypes.func,
        infoData: PropTypes.object
    };

    static defaultProps = {
        getInfoAboutNumber: () => {
        },
        infoData: null
    };

    handleFromSearch = ({number}) => {
        this.props.getInfoAboutNumber({number});
        const {bankName, outpost, address, postal, phone} = getDataPerNumber(number);
        this.setState({
            bankName,
            outpost,
            address,
            postal,
            phone
        })
    };

    renderData = () => {
        if (this.props.infoData) {
            return <Fragment>
                <InfoPerNumber bankName={this.state.bankName}
                               outpost={this.state.outpost}
                               address={this.state.address}
                               postal={this.state.postal}
                               phone={this.state.phone}/>
                {/*<Comments comments={this.props.infoData.comments}/>*/}
            </Fragment>
        }
    };

    render() {
        const title = 'Get information about account number';

        return <Fragment>
            <Search title={title} handleSearch={({number}) => this.handleFromSearch({number})}/>
            {this.renderData()}
        </Fragment>
    }
}

const mapStateToProps = store => {
    return {
        infoData: store.number.infoData
    }
};

export default connect(mapStateToProps, actions)(ViewInfo);