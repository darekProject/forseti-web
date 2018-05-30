import React, {Component} from 'react';
import {getUserName} from '../../../utils/utlis';
import './Comment.css';

class Comment extends Component {
    renderRemoveBtn = () => {
        const userName = getUserName();
        const {id, removeComment} = this.props;
        if (userName === this.props.userName) {
            return <button className="remove-comment"
                           onClick={() => removeComment(id)}>
                <img src="images/trash.png" alt=""/>
            </button>
        }
    };

    render() {
        return <div className="row">
            <div className="col-lg-12">
                <div className="comment">
                    <header>
                        <img src="images/user-icon.png" alt=""/>
                        <div>
                            <p>{this.props.userName}</p>
                            <p className="timestamp">{new Date(this.props.timestamp).toLocaleString()}</p>
                        </div>
                    </header>
                    <article>
                        <p>{this.props.comment}</p>
                    </article>
                    {this.renderRemoveBtn()}
                </div>
            </div>
        </div>
    }
};

export default Comment;