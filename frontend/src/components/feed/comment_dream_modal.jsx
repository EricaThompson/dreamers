import React from 'react';
import { Link } from 'react-router-dom';
import CommentItem from './comment_item';

class CommentDreamModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            likes: [],
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.resetErrors();
        this.setState({
            likes: this.props.info.likes
        })
    }

    componentWillUnmount() {
        this.props.clearModalInfo();
    }

    handleSubmit(e) {
        e.preventDefault();
        let thisComment = {
            comment: this.state.comment,
        }
        this.props.createComment(this.props.info._id, thisComment);
        this.setState({ comment: '' })
    }

    handleChange(e) {
        this.setState({ comment: e.target.value })
        this.props.clearErrors();
    }

    like() {
        let like = {
            username: this.props.currentUser.username,
            dreamId: this.props.info._id,
            userId: this.props.currentUser.id,
        }
        if (this.state.loading === false) {
            this.setState({ loading: true });
            this.props.createLike(this.props.info._id, like)
                .then(() => this.setState({ likes: this.props.info.likes, loading: false }))
        }
    }

    unlike() {
        if (this.state.loading === false) {
            this.setState({ loading: true });
            this.state.likes.forEach(like => {
                if (like.username === this.props.currentUser.username) {
                    if (like.id) {
                        this.props.deleteLike(like.id).then(() => { this.setState({ likes: [], loading: false }) })
                    } else {
                        this.props.deleteLike(like._id).then(() => { this.setState({ likes: [], loading: false }) })
                    }
                }
            })
        }
    }

    render() {
        let { info, comments, currentUser, errors } = this.props;

        let commentFeed;
        let tags;

        if (Object.values(comments).length === 0) {
            commentFeed = null;
        } else {
            commentFeed = (
                <div>
                    {Object.values(comments).map((comment, idx) => {
                        return <CommentItem 
                                    key={comment._id} 
                                    comment={comment} 
                                    updateComment={this.props.updateComment}
                                    currentUser={this.props.currentUser}
                                    deleteComment={this.props.deleteComment}
                                    errors={errors}
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

        let liked = false;

        if (this.state.likes) {
            this.state.likes.forEach(like => {
                if (like.username === currentUser.username) {
                    liked = true;
                } 
            }) 
        } 

        if (liked){
            likeIcon = <i
                className="fas fa-heart liked"
                onClick={() => this.unlike()}
            >
            </i>;
        } else {
            likeIcon = <i
                className="far fa-heart unliked"
                onClick={() => this.like()}
            >
            </i>
        }

        if (info.tags) {
            tags =
                info.tags.map((tag, idx) => {
                    if (tag != null) {
                        return (
                            <Link 
                                to={`/tags/${tag}`} 
                                key={idx} 
                                style={{ textDecoration: 'none' }} 
                            >
                                <div 
                                    className="new-dream-tags-item-container" 
                                    onClick={e => e.stopPropagation()} 
                                >
                                    <div 
                                        className={
                                            info.type === "dream" 
                                            ? "new-dream-tags-item-circle" 
                                            : "new-goal-tags-item-circle"} 
                                    >
                                    </div>
                                    <p 
                                        className="new-dream-tags-item" >{tag}
                                    </p>
                                </div>
                            </Link>
                        )
                    } else {
                        return null;
                    }
                })


        } else {
            tags = null
        }
        

        return (
            <div className="comment-modal-outer-container">
                <div className="comment-dreams-container" >
                    <div className='comment-like'>{likeIcon}</div>
                    <div 
                        className={
                            this.props.info.type === "dream" 
                            ? "comment-dreams" 
                            : "comment-goals"
                        }
                    >
                        <div className="new-dream-tags-container" >
                            <div className="new-dream-tags" >
                                {tags}
                            </div>
                        </div>
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
                        <form 
                            className="comment-form" 
                            onSubmit={this.handleSubmit} 
                        >
                            <label className="comment-label" >
                                <textarea 
                                    className="comment-input" 
                                    type="text" 
                                    placeholder="Leave your comment here"
                                    value={this.state.comment}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <div className="session-errors-container">
                                {Object.values(this.props.errors).map(err => {
                                    return <p className="session-errors" >{err}</p>
                                })}
                            </div>
                            <div className="comment-btn-container">
                                <input 
                                    className="comment-btn" 
                                    type="submit" 
                                    value="Create Comment" 
                                    onClick={this.handleSubmit} 
                                />
                            </div>
                        </form>

                        <div className="comment-feed-container" >
                            {commentFeed}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentDreamModal;