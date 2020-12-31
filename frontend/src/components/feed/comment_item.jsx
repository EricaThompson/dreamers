import React from 'react';
import { Link } from 'react-router-dom';

class CommentItem extends React.Component {
    render() {
        let { comment } = this.props;
        return (
            <div className="comment-item-outer-container" >
                <div className="comment-item-container">
                    <p className="comment-item-text" >
                        <Link to={`/users/${comment.userId}`} style={{ textDecoration: 'none' }} className="comment-item-text-link" >
                            {comment.username}
                        </Link>
                    </p>
                    <p className="comment-item-text" >{comment.comment}</p>
                </div>
            </div>
        )
    }
}

export default CommentItem;