import React from 'react';
import { Link } from 'react-router-dom';

class CommentDreamModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // debugger;
        this.props.fetchCommentsByDream(this.props.info._id)
    }

    handleSubmit(e) {
        e.preventDefault();
        let comment = {
            comment: this.state.comment,
            username: this.props.info.username,
            userId: this.props.info.userId,
        }
        this.props.createComment(comment);
    }

    handleChange(e) {
        this.setState({ comment: e.target.value })
    }

    render() {
        let { info, comments } = this.props;

        // if ( !comments ) return null;

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
                        <form className="comment-form" onSubmit={this.handleSubmit} >
                            <label className="comment-label" >
                                <textarea className="comment-input" 
                                    type="text" 
                                    placeholder="Leave your comment here"
                                    value={this.state.comment}
                                    onChange={this.handleChange}
                                    />
                            </label>
                            <div className="comment-btn-container">
                                <input className="comment-btn" type="submit" value="Create Comment" onClick={this.handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentDreamModal;