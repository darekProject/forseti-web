import React, {Component} from 'react';
import Comment from "./Comment/Comment";

import './Comments.css'

class Comments extends Component {

    renderComments = () => {
        // const {comments} = this.props;
        // return comments.map(comment => <Comment name={comment.name} conntent={comment.content}/>)
    };

    render() {
        return <div className="container comments">
            {this.renderComments()}
            <div className="row">
                <div className="col-lg-12">
                    <button className="add-comments">Add your comment!!</button>
                </div>
            </div>
        </div>
    }
}

export default Comments;