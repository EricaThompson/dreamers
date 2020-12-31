import React from 'react';
import { Link } from 'react-router-dom';

class CommentDreamModal extends React.Component {
    render() {
        let { info } = this.props;

        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    <div className="comment-dreams" >
                        <p className="comment-dreams-info" >
                            <Link to={`/users/${info.userId}`} className="comment-dreams-info" style={{ textDecoration: 'none' }}>
                                {info.username}
                            </Link>
                        </p>
                        <p className="comment-dreams-info" >{info.text}</p>
                        <form className="comment-form" >
                            <label className="comment-label" >
                                <textarea className="comment-input" type="text" placeholder="Leave your comment here"/>
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

export default CommentDreamModal;