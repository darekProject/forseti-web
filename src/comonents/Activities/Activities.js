import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import Activity from './Activity/Activity';

import './Activities.css';

class Activities extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialData();
    }

    getInitialData = () => {
        return {
            activities: null
        }
    };

    componentDidMount() {
        this.props.getActivities();
    }

    componentWillReceiveProps(nextProps) {
        const {activities} = nextProps;
        if (activities.data) {
            this.mapAllActivities(activities.data);
        }
    }

    mapAllActivities = (activities) => {
        const {comments, thumbsDetails} = activities;
        const allActivities = [];

        Object.entries(comments).map(keyValue => {
            const value = keyValue[1];
            if (value instanceof Array) {
                value.map(val => {
                    allActivities.push({activity: 'comment', timestamp: val.timeStamp, number: keyValue[0]});
                });
            } else {
                allActivities.push({activity: 'comment', timestamp: value.timeStamp, number: keyValue[0]})
            }

        });

        Object.entries(thumbsDetails).map(keyValue => {
            const value = keyValue[1];
            let activity = '';
            if (value instanceof Array) {
                value.map(val => {
                    if (val.thumb === 'UP') {
                        activity = 'thumb up';
                    } else {
                        activity = 'thumb down';
                    }

                    allActivities.push({activity, timestamp: val.timeStamp, number: keyValue[0]});
                });
            } else {
                if (value.thumb === 'UP') {
                    activity = 'thumb up';
                } else {
                    activity = 'thumb down';
                }
                allActivities.push({activity, timestamp: value.timeStamp, number: keyValue[0]});
            }

        });

        allActivities.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        this.setState({activities: allActivities});
    };

    renderActivities = () => {
        const {activities} = this.state;

        if (activities) {
            return activities.map(activity => {
                const props = {
                    activityType: activity.activity,
                    timestamp: activity.timestamp,
                    number: activity.number
                };

                return <Activity {...props}/>
            })
        }
    };

    render() {
        return (
            <div className="container activities-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="activities-title">
                            Your activities:
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 activities">
                        {this.renderActivities()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activities.activities
    }
};

export default connect(mapStateToProps, actions)(Activities);