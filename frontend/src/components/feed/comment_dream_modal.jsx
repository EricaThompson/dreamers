import React from 'react';
import { Link } from 'react-router-dom';
import CommentItem from './comment_item';

class CommentDreamModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            likes: [],
            numLikes: null,
            propLikes: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // debugger;
        // this.props.fetchCommentsByDream(this.props.info._id)
        this.props.resetErrors();
    }

    componentWillUnmount() {
        this.props.clearModalInfo();
    }

    handleSubmit(e) {
        e.preventDefault();
        let thisComment = {
            comment: this.state.comment,
            // username: this.props.info.username,
            // userId: this.props.info.userId,
        }
        // debugger;
        this.props.createComment(this.props.info._id, thisComment);
        this.setState({ comment: '' })
    }

    handleChange(e) {
        this.setState({ comment: e.target.value })
    }

    like() {
        console.log(this.props)
        let like = {
            username: this.props.currentUser.username,
            dreamId: this.props.dream._id,
            userId: this.props.currentUser._id,
        }
        this.props.createLike(this.props.dream._id, like)
            .then(res => this.setState({ currentLike: res.like._id }))
        window.location.reload()
    }

    unlike() {
        this.state.likes.forEach(like => {
            if (like.username === this.props.currentUser.username) {
                this.props.deleteLike(like._id)
            }
        })
        //!fix
        window.location.reload()
    }

    render() {
        let { info, comments, errors, currentUser } = this.props;

        let commentFeed;

        if (Object.values(comments).length === 0) {
            commentFeed = null;
        } else {
            commentFeed = (
                <div>
                    {Object.values(comments).map((comment, idx) => {
                        return <CommentItem 
                                    key={idx} 
                                    comment={comment} 
                                    updateComment={this.props.updateComment}
                                    currentUser={this.props.currentUser}
                                    deleteComment={this.props.deleteComment}
                                    errors={this.props.errors}
                                />
                    })}
                </div>
            )
        }

        let likeIcon;

        likeIcon = <i
            className="far fa-heart"
            onClick={() => this.like()}
        >
        </i>

        if (this.state.likes) {
            // console.log(this.state.likes)
            this.state.likes.forEach(like => {

                if (like.username === currentUser.username) {
                    likeIcon = <i
                        className="fas fa-heart"
                        onClick={() => this.unlike()}
                    >
                    </i>;

                } else {
                    likeIcon = <i
                        className="far fa-heart"
                        onClick={() => this.like()}
                    >
                    </i>
                }
                // console.log(this.state.likes[0].username)
            })
        } 
        

        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    {likeIcon}
                    <div className={this.props.info.type === "dream" ? "comment-dreams" : "comment-goals"}>
                        <p className="comment-dreams-info" >
                            <Link 
                                to={`/users/${info.userId}`} 
                                className="comment-dreams-info-link" 
                                style={{ textDecoration: 'none' }}
                            >
                                    {info.username}
                            </Link>
                        </p>
                        <p className="comment-dreams-info" >{info.text}</p>
                        <form className="comment-form" onSubmit={this.handleSubmit} >
                            <label className="comment-label" >
                                <textarea 
                                    className="comment-input" 
                                    type="text" 
                                    placeholder="Leave your comment here"
                                    value={this.state.comment}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <div className="comment-btn-container">
                                <input 
                                    className="comment-btn" 
                                    type="submit" 
                                    value="Create Comment" 
                                    onClick={this.handleSubmit} 
                                />
                            </div>
                        </form>
                        <div className="session-errors-container">
                            {errors.map(err => <p className="session-errors" >{err}</p>)}
                        </div>
                        <div className="comment-feed-container" >{commentFeed}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentDreamModal;