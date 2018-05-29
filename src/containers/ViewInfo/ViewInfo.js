import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import {getDataPerNumber} from '../../utils/numberData';

import Search from "../../comonents/Search/Search";
import InfoPerNumber from "../../comonents/InfoPerNumber/InfoPerNumber";
import Comments from "../../comonents/Comments/Comments";

import './ViewInfo.css';
import CheckNumber from "../CheckNumber/CheckNumber";

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
            phone: '',
            number: null
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
            phone,
            number
        })
    };

    renderData = () => {
        if (this.props.infoData) {
            return <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-7">
                        <Comments comments={this.props.infoData.data.comments} accountNumber={this.state.number}/>
                    </div>
                    <div className="col-lg right-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <InfoPerNumber bankName={this.state.bankName}
                                               outpost={this.state.outpost}
                                               address={this.state.address}
                                               postal={this.state.postal}
                                               phone={this.state.phone}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <CheckNumber number={this.state.number}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    };

    render() {
        const title = 'Check number';

        return <div className="container-fluid check-number">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Search title={title} handleSearch={({number}) => this.handleFromSearch({number})}/>
                    </div>
                </div>
                <div className="row">
                    {this.renderData()}
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = store => {
    return {
        infoData: store.number.infoData
    }
};

export default connect(mapStateToProps, actions)(ViewInfo);