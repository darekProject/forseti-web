import React, {Component, Fragment} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Comment from "./Comment/Comment";
import CommentsModal from '../CommentsModal/CommentsModal';

import './Comments.css'

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        }
    }

    modalBackdropClicked = () => {
        this.setState({modalVisible: false});
    };

    renderComments = () => {
        const {comments} = this.props;
        const commentsArray = [];
        Object.entries(comments).map(keyValue => {
            commentsArray.push({user: keyValue[0], comments: keyValue[1]});
        });

        const allComments = [];

        for (let el of commentsArray) {
            el.comments.map(comment => allComments.push({user: el.user, comment}))
        }

        return allComments.map(({user, comment}) => {
            const props = {
                userName: user,
                comment: comment.comment,
                id: comment.id,
                timestamp: new Date(comment.timeStamp).toLocaleString(),
                removeComment: (id) => this.handleRemoveComment(id)
            };

            return <Comment {...props}/>
        })
    };

    handleSubmitAddComments = values => {
        this.props.addComment(values);
    };

    handleRemoveComment = (id) => {
        this.props.removeComment(id);
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
        return <div className="container comments">
            <Fragment>
                {this.renderComments()}
            </Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <button onClick={() => this.switchModal()} className="add-comments">Add your comment!!</button>
                </div>
            </div>
            {this.renderModal()}
        </div>
    }
}

export default connect(null, actions)(Comments);