import React from 'react';

import './Activity.css'

const getImgPerActivity = (type) => {
    switch (type) {
        case 'comment':
            return <img src="images/comment.png" alt=""/>;
        case 'thumb up':
            return <img src="images/thumb-up.png" alt=""/>;
        case 'thumb down':
            return <img src="images/thumb-up.png" alt=""/>;
    }
};

const Activity = (props) => {
    return (
        <div className="row">
            <div className="col-lg-12 activity">
                <p>{getImgPerActivity(props.activityType)}You have given <span>{props.activityType}</span> to account
                    with number: <span> {props.number}</span></p>
                <span>{new Date(props.timestamp).toDateString()} {new Date(props.timestamp).toLocaleTimeString()}</span>
            </div>
        </div>
    )
};

export default Activity;