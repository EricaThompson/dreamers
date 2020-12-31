import React from 'react';
import { Link } from 'react-router-dom';

class CommentGoalModal extends React.Component {
    render() {
        let { info } = this.props;

        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    <div className="comment-goals" >
                        <p className="comment-goals-info" >
                            <Link to={`/users/${info.userId}`} className="comment-goals-info" style={{ textDecoration: 'none' }}>
                                {info.username}
                            </Link>
                        </p>
                        <p className="comment-goals-info" >{info.text}</p>
                        <form className="comment-form" >
                            <label className="comment-label" >
                                <textarea className="comment-input" type="text" placeholder="Leave your comment here" />
                            </label>
                            <div className="comment-btn-container">
                                <input className="comment-btn" type="submit" value="Create Comment" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentGoalModal;