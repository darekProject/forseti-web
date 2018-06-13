import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import './UserDTOPage.css'

class UserDTOPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            comments: null,
            thumbs: null
        }
    }

    renderComments = () => {
        const {comments} = this.state;

        if (comments && comments.length > 0) {
            return comments;
        } else {
            return <div className="col-lg-12">
                <p>User do not add any comment!</p>
            </div>
        }
    };

    renderThumbs = () => {
        const {thumbs} = this.state;

        if (thumbs && thumbs.length > 0) {
            return thumbs;
        } else {
            return <div className="col-lg-12">
                <p>User do not add any thumbs!</p>
            </div>
        }
    };

    componentDidMount() {
        const username = this.props.match.params.user;
        this.props.getUser(username);
    }

    componentWillReceiveProps(nextProps) {
        const {user: {username, comments, thumbsDetails}} = nextProps;

        const commentsMap = new Map();
        const thumbsMap = new Map();

        Object.entries(comments).map(el => commentsMap.set(el[0], el[1]));
        Object.entries(thumbsDetails).map(el => thumbsMap.set(el[0], el[1]));

        this.parseToArray(username, commentsMap, thumbsMap);
    }

    parseToArray = (username, commentsMap, thumbsMap) => {
        const commentsArray = [];
        const thumbsArray = [];

        for (let [number, comments] of commentsMap.entries()) {
            if (comments instanceof Array) {
                comments.map(comment => {
                    const div = <div className="col-lg-12" id={`${comment.id}`}>
                        <div>
                            <p className="number"><span>Number:</span> {number}</p>
                            <p className="content"><span>Content:</span> {comment.comment}</p>
                            <p className="date"><span>Date:</span> {new Date(comment.timeStamp).toLocaleString()}</p>
                            <button className='btn-remove' onClick={() => this.removeComment(username, comment.id)}><img src="/images/remove.png" alt=""/></button>
                        </div>
                    </div>;
                    commentsArray.push(div);
                });
            } else {
                const div = <div className="col-lg-12" id={`${comments.id}`}>
                    <div>
                        <p className="number"><span>Number:</span> {number}</p>
                        <p className="content"><span>Content:</span> {comments.comment}</p>
                        <p className="date"><span>Date:</span> {new Date(comments.timeStamp).toLocaleString()}</p>
                        <button className='btn-remove' onClick={() => this.removeComment(username, comments.id)}><img src="/images/remove.png" alt=""/></button>
                    </div>
                </div>;
                commentsArray.push(div);
            }
        }


        for (let [number, thumbs] of thumbsMap.entries()) {
            const div = <div className="col-lg-12" id={`${number}`}>
                <div>
                    <p className="number"><span>Number:</span> {number}</p>
                    <p className="content"><span>Thumb:</span> {this.getImgPerActivity(thumbs.thumb)}</p>
                    <p className="date"><span>Date:</span> {new Date(thumbs.timeStamp).toLocaleString()}</p>
                    <button className='btn-remove' onClick={() => this.removeThumb(username, number, thumbs.thumb)}><img src="/images/remove.png" alt=""/></button>
                </div>
            </div>;
            thumbsArray.push(div);
        }

        this.setState({
            comments: commentsArray,
            thumbs: thumbsArray,
            username
        });
    };

    removeComment = (username, id) => {
        const {comments} = this.state;
        const commentIndex = comments.findIndex(comment => parseInt(comment.props.id, 10) === id);
        comments.splice(commentIndex, 1);
        this.props.deleteComment(username, id);

        this.setState({comments});
    };

    removeThumb = (username, number, thumb) => {
        const {thumbs} = this.state;
        const thumbIndex = thumbs.findIndex(thumb => parseInt(thumb.props.id, 10) === number);
        thumbs.splice(thumbIndex, 1);
        this.props.deleteThumb(username, number, thumb);

        this.setState({thumbs});
    };

    getImgPerActivity = type => {
        switch (type) {
            case 'UP':
                return <img src="/images/thumb-up.png" alt=""/>;
            case 'DOWN':
                return <img className="rotate-180" src="/images/thumb-up.png" alt=""/>;
            default:
                return null
        }
    };


    render() {
        return (
            <div className="container user-dto">
                <div className="row">
                    <div className="col-lg-12 username-dto">
                        <h1>Username: {this.state.username}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 user-dto-title">
                        <h1>Comments: </h1>
                    </div>
                    <div className="col-lg user-dto-title">
                        <h1>Thumbs: </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 user-dto-content">
                        <div className="row">
                            {this.renderComments()}
                        </div>
                    </div>
                    <div className="col-lg user-dto-content">
                        <div className="row">
                            {this.renderThumbs()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.admin.user
    }
};

export default withRouter(connect(mapStateToProps, actions)(UserDTOPage));