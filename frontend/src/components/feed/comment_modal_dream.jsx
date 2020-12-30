import React from 'react';
import { Link } from 'react-router-dom';

class CommentDreamModal extends React.Component {
    render() {
        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    <div className="comment-dreams" >
                        <Link to="/feed" style={{ textDecoration: 'none' }} >
                            <p className="comment-dreams-info" >username</p>
                            <p className="comment-dreams-info" >this is the text of a dream</p>
                            <form className="comment-form" >
                                <label className="comment-label" >
                                    <textarea className="comment-input" type="text" placeholder="Leave your comment here"/>
                                </label>
                                <div className="comment-btn-container">
                                    <input className="comment-btn" type="submit" value="Create Comment" />
                                </div>
                            </form>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentDreamModal;