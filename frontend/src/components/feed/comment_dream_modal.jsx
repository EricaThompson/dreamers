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
            currentLike: 'like',
            isLiked: false,
            likeOnce: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.props.resetErrors();
        this.props.fetchLikesByDream(this.props.info._id)
            .then(res => this.setState({ likes: res.likes }))
            .then(this.setState({ propLikes: this.props.like }))
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
    }

    like() {

        let like = {
            username: this.props.currentUser.username,
            dreamId: this.props.info._id,
            userId: this.props.currentUser.id,
        }
        this.props.createLike(this.props.info._id, like)
            .then(res => console.log('res?',res))

        this.setState({currentLike: ''})

        //!fix
        window.location.reload()
    }

    liked(){
        if(this.state.likeOnce === 0){
            this.setState({isLiked: true})
            this.setState({likeOnce: 1})
        }
    }

    unlike() {
        this.state.likes.forEach(like => {
            if (like.username === this.props.currentUser.username) {
                this.props.deleteLike(like._id)
            }
        })
        this.setState({ currentLike: '' })
        //!fix
        window.location.reload()
    }

    render() {
        let { info, comments, errors, currentUser } = this.props;

        let commentFeed;
        let tags;

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

        let liked = false;

        if (this.state.likes) {
            console.log('this state likes',this.state.likes)
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