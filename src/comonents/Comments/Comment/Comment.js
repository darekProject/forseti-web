import React, {Component} from 'react';
import {getUserName} from '../../../utils/utlis';
import './Comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = '';
    }

    renderRemoveBtn = () => {
        const userName = getUserName();
        const {id, removeComment} = this.props;
        if (userName === this.props.userName) {
            return <button className="remove-comment"
                           onClick={() => removeComment(id)}>
                <i className="fas fa-trash-alt"></i>
            </button>
        }
    };

    render() {
        return <div className="row">
            <div className="col-lg-12">
                <div className="comment">
                    <header>
                        <i className="fas fa-user"></i>
                        <div>
                            <p>{this.props.userName}</p>
                            <p className="timestamp">{this.props.timestamp}</p>
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