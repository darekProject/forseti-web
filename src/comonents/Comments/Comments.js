import React, {Component, Fragment} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Comment from "./Comment/Comment";
import CommentsModal from '../CommentsModal/CommentsModal';

import './Comments.css'
import {getToken, getUserName} from "../../utils/utlis";

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            rightComment: null,
            comments: null,
            number: props.accountNumber
        }
    }

    modalBackdropClicked = () => {
        this.setState({modalVisible: false});
    };

    mapComments = (newComments) => {
        const comments = newComments;
        const commentsArray = [];
        Object.entries(comments).map(keyValue => {
            commentsArray.push({user: keyValue[0], comments: keyValue[1]});
        });

        const allComments = [];

        for (let el of commentsArray) {
            el.comments.map(comment => allComments.push({user: el.user, comment}))
        }

        const rightComments = allComments.map(({user, comment}) => {
            return {
                userName: user,
                comment: comment.comment,
                id: comment.id,
                timestamp: comment.timeStamp,
                removeComment: (id) => this.handleRemoveComment(id)
            };
        });

        rightComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        this.setState({comments: rightComments});
    };

    handleSubmitAddComments = ({comment}) => {
        this.props.addComment(this.state.number, comment);
        this.switchModal();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.comments) {
            this.mapComments(nextProps.comments);
        }
    }

    handleRemoveComment = id => {
        this.props.removeComment(id);

        const {comments} = this.state;
        const commentsIndex = comments.findIndex(com => com.id === id);
        comments.splice(commentsIndex, 1);

        this.setState({comments});
    };

    componentDidMount() {
        const {comments} = this.props;
        this.mapComments(comments);
    }

    renderComments = () => {
        const {comments} = this.state;

        if (comments && comments.length > 0) {
            return comments.map(comment => <Comment {...comment}/>)
        } else {
            return (
                <div className="row">
                    <div className="col-lg-12 no-comments">
                        <span>No comments!</span>
                    </div>
                </div>
            )
        }
    };


    renderModal = () => {
        return <CommentsModal modalVisible={this.state.modalVisible}
                              modalBackdropClicked={this.modalBackdropClicked}
                              accountNumber={this.props.accountNumber}
                              handleSubmitAddComments={this.handleSubmitAddComments}
                              switchModal={this.switchModal}/>
    };

    switchModal = () => {
        const {modalVisible} = this.state;
        this.setState({modalVisible: !modalVisible});
    };

    render() {
        return <div className="row">
            <div className="col-lg-12 comments">
                <div className="row">
                    <div className="col-lg-12 comments-title">
                        <h1>Comments: </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 comments-box">
                        {this.renderComments()}
                    </div>
                    <div className="col-lg-12 add-comments">
                        {getToken() ? <button onClick={() => this.switchModal()} className="add-comments-btn">
                            <i className="fas fa-pencil-alt"></i></button> : null}
                    </div>
                    {this.renderModal()}
                </div>
            </div>
        </div>
    }
}

Comments.defaultTypes = {
    comments: null
};

export default connect(null, actions)(Comments);