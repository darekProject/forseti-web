import React from 'react';

import './Comment.css';

const Comment = props => {
    return <div className="row">
        <div className="col-lg-12">
            <div className="comment">
                <header>
                    <i className="fas fa-user"></i>
                    <p>{props.name}</p>
                </header>
                <article>
                    <p>{props.conntent}</p>
                </article>
            </div>
        </div>
    </div>
};

export default Comment;