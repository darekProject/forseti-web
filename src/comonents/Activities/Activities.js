import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import Activity from './Activity/Activity';

class Activities extends Component {
    render() {
        return <div>Activities</div>
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activities.activities
    }
};

export default connect(mapStateToProps, actions)(Activities);