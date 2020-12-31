import React from 'react';
import { Link } from 'react-router-dom';
import CommentItem from './comment_item';

class CommentGoalModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let comment = {
            comment: this.state.comment,
            username: this.props.info.username,
            userId: this.props.info.userId,
        }
        this.props.createComment(this.props.info._id, comment);
    }

    handleChange(e) {
        this.setState({ comment: e.target.value })
        console.log(this.state.comment)
    }

    render() {
        let { info, comments } = this.props;

        let commentFeed;

        if (Object.values(comments).length === 0) {
            commentFeed = null;
        } else {
            commentFeed = (
                <div>
                    {Object.values(comments).map((comment, idx) => {
                        return <CommentItem key={idx} comment={comment} />
                    })}
                </div>
            )
        }

        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    <div className="comment-goals" >
                        <p className="comment-goals-info" >
                            <Link to={`/users/${info.userId}`} className="comment-goals-info-link" style={{ textDecoration: 'none' }}>
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
                        <div className="comment-feed-container" >{commentFeed}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentGoalModal;