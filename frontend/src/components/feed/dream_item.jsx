import React from 'react';
import { Link } from 'react-router-dom';

class DreamItem extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.tags,
            showMenu: false,
            likes: [],
            numLikes: null,
            propLikes: null,
            timestamp: null,
            popout: false,
            currentLike: '',
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.refreshAfterDelete = this.refreshAfterDelete.bind(this);
        this.handlePopOut = this.handlePopOut.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this)
    }

    componentDidMount(){
        this._isMounted = true;
        // this.props.fetchLikesByDream(this.props.dream._id)
        //     .then(res => this.setState({likes: res.likes}))
        //     .then(this.setState({propLikes: this.props.like}))
        
        this.setState({ 
            timestamp: this.props.dream._id.toString().substring(0, 8)
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    toggleEdit() {
        this.setState({ showEditForm: !this.state.showEditForm })
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu })
    }

    toggleAndStopPropagation(e){
        this.toggleMenu();
        e.stopPropagation();

    }

    closeMenu() {
        this.setState({ showMenu: false })
    }

    refreshAfterDelete(dreamId){
        this.props.deleteDream(dreamId)
        //! fix this
            .then(window.location.reload())
    }

    like(){
        let like = {
            username: this.props.dream.username,
            dreamId: this.props.dream._id,
            userId: this.props.currentUser._id,
        }
        this.props.createLike(this.props.dream._id, like)
            .then(() => this.setState({ likes: this.props.dream.likes }))
        
        // this.props.fetchLikesByDream(this.props.dream._id)
        //!fix
        // window.location.reload()
    }


    unlike(){
        this.state.likes.forEach(like=>{
            if (like.username === this.props.currentUser.username){
                this.props.deleteLike(like._id).then(() =>{this.setState({likes: this.props.dream.likes})})
            }
        })
        //!fix
        // window.location.reload()
    }

    handlePopOut() {
        this.setState({popout: !this.state.popout})
    }

    handleOpenModal(e) {
        this.props.clearComments();
        this.props.fetchCommentsByDream(this.props.dream._id);
        this.props.openModal('commentDream');
        this.props.modalInfo(this.props.dream);
    }

    handleOpenEditModal(e) {
        this.setState({showMenu: false})
        this.props.openModal('newDream');
        this.props.modalInfo(this.props.dream);
    }

    render() {
        // console.log('likes: ', this.state.likes)

        let { dream, 
            currentUser, 
        } = this.props;
        let tags;

        let date = new Date(parseInt(this.state.timestamp, 16) * 1000)
        let month = date.getMonth()

        switch (month) {
            case 0:
                month = "Jan"
                break;
            case 1:
                month = "Feb"
                break;
            case 2:
                month = "Mar"
                break;
            case 3:
                month = "Apr"
                break;
            case 4:
                month = "May"
                break;
            case 5:
                month = "Jun"
                break;
            case 6:
                month = "Jul"
                break;
            case 7:
                month = "Aug"
                break;
            case 8:
                month = "Sep"
                break;
            case 9:
                month = "Oct"
                break;
            case 10:
                month = "Nov"
                break;
            case 11:
                month = "Dec"
                break;

            default:
                break;
        }

        if (this.state.tags) {
            tags =
                this.state.tags.map((tag, idx) => {
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
                                        className={dream.type === "dream" 
                                        ? "new-dream-tags-item-circle" 
                                        : "new-goal-tags-item-circle"} 
                                    >

                                    </div>
                                    <p className="new-dream-tags-item" >
                                        {tag}
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

        let editIcon;
        let deleteIcon;
        let menuOptions;
        let optionsIcon;
        let likeIcon;

        likeIcon = <i
            className="far fa-heart"
            onClick={() => this.like()}
        >
        </i>

        let liked = false;
        //! likes functionality
        if (this.props.dream.likes) {
            this.props.dream.likes.forEach(like => {

                if (like.username === currentUser.username) {
                    liked = true;
                }
            })
        }

        

        if (liked) {
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

        if (dream.username === currentUser.username) {
            optionsIcon = <i
                            className="fas fa-ellipsis-h"
                            onClick={() => this.toggleMenu()}>
                            <br />
                            {likeIcon}
                        </i>

            editIcon = <div
                            className="icon"
                            onClick={this.handleOpenEditModal}
                        >
                            <i className="fas fa-pencil-alt"></i>
                    </div>
            deleteIcon = <div
                            className='icon'
                            onClick={()=> this.refreshAfterDelete(dream._id)}
                        >
                            <i 
                                className="fas fa-trash-alt"
                            >
                            </i>
                        </div>
        } 

        if (this.state.showMenu) {
            optionsIcon = <p onClick={() => this.toggleMenu()}>✕</p>
            
            menuOptions = <div className='available-options'>
                {editIcon}
                {deleteIcon}

            </div>
        } else if (dream.username === currentUser.username){
            optionsIcon = <i
                className="fas fa-ellipsis-h"
                onClick={() => this.toggleMenu()}>
                    <br />                  
            </i>
        }

        let popout;

        if (this.props.dream.likes.length > 0) {
            popout = <div className="likes-popout-inner-container">
                <span 
                    onClick={this.handlePopOut} 
                    className="close-popout-btn">
                        &#x2715;
                </span>
                {this.state.likes.map((like, idx) => {
                    return <Link 
                                key={idx} 
                                to={`/users/${like.userId}`} 
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="popout-item" >
                                    {like.username}
                                </div>
                            </Link>
                })}
            </div>
        } else {
            popout = <div className="likes-popout-inner-container" >
                <span 
                    onClick={this.handlePopOut} 
                    className="close-popout-btn">
                        &#x2715;
                </span>
                <p className="popout-item-none" >Be the first to like!</p>
            </div>
        }
        
        return (
            <div className={
                dream.type === "dream" 
                    ? "feed-dreams-wrapper" 
                    : "feed-goals-wrapper"} 
                    onClick={this.handleOpenModal}
            >
                <div 
                    key={Math.random()} 
                    className="comment-options" 
                    onClick={(e)=>this.toggleAndStopPropagation(e)} 
                >
                    {optionsIcon}
                    <br />
                    {likeIcon}
                    {menuOptions}
                </div>

                <div className={
                    dream.type === "dream" 
                        ? "feed-dreams" 
                        : "feed-goals"}   
                >
                    {dream.type === "dream" ? 
                        <div>
                            <div className="feed-dreams-circle-big" ></div>
                            <div className="feed-dreams-circle-small" ></div>
                        </div>
                    : ""}
                        <div className="new-dream-tags-container" >
                            <div className="new-dream-tags" >
                                {tags}
                            
                            </div>
                        </div>
                    <div className="feed-dreams-info" >
                            <Link 
                                to={`/users/${dream.userId}`} 
                                className="feed-dreams-info-link" 
                                style={{ textDecoration: 'none' }}
                            >
                                {dream.username} 
                            </Link>
                            <p 
                                className='dream-item-date'
                            >
                                {month} {date.getDate()}, {date.getFullYear()}
                            </p>
                        </div>
                        <p className="feed-dreams-info" >{dream.text}</p>
                    <div className="feed-dreams-footer" >
                        <p 
                            className="feed-dreams-footer-info">
                                {dream.comments ? dream.comments.length : 0} 
                            <span 
                                className="feed-dreams-footer-comments" 
                            >
                                {dream.comments && dream.comments.length === 1 
                                    ? " comment" 
                                    : " comments"}
                            </span>
                        </p>
                        <div className="feed-dreams-footer">

                            <p 
                                className="feed-dreams-footer-info" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                {this.props.dream.likes.length} 
                                <span 
                                    onClick={this.handlePopOut} 
                                    className="feed-dreams-footer-likes" >
                                    {this.props.dream.likes.length === 1 
                                    ? " like" 
                                    : " likes"}
                                </span>
                            </p>
                            {this.state.popout ? 
                                <div 
                                    className="likes-popout-container" 
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    {popout} 
                                </div>
                            : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DreamItem;