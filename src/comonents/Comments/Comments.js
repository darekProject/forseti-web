import React, {Component} from 'react';
import Comment from "./Comment/Comment";

class Comments extends Component {

    renderComments = () => {
        const {comments} = this.props;

        return comments.map(comment => <Comment name={comment.name} conntent={comment.content}/>)
    };

    render() {
        return <div className="container comments">
            {this.renderComments()}
            <button>Add your comment!!</button>
        </div>
    }
}

export default Comments;