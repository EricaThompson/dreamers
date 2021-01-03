import React from 'react';
import { Link } from 'react-router-dom';

class DreamItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.tags,
            showMenu: false,
            like: this.props.like,
            numLikes: null
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.refreshAfterDelete = this.refreshAfterDelete.bind(this)
    }

    componentDidMount(){
        // this.props.fetchLike(this.props.dream._id)
        this.props.fetchLikesByDream(this.props.dream._id)
            .then(res => this.setState({numLikes: res.likes.length}))
        
    }

    toggleEdit() {
        this.setState({ showEditForm: !this.state.showEditForm })
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu })
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
    }

    // unlike(){
    //     this.props.deleteLike
    // }

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
        console.log('like?', this.state.numLikes)

        let { dream, 
            currentUser, 
            // createLike
        } = this.props;
        let tags;

        if (this.state.tags) {
            tags =
                this.state.tags.map((tag, idx) => {
                    if (tag != null) {
                        return (
                            <Link to={`/tags/${tag}`} key={idx} style={{ textDecoration: 'none' }} >
                                <div className="new-dream-tags-item-container" onClick={e => e.stopPropagation()} >
                                    <div className="new-dream-tags-item-circle" ></div>
                                    <p className="new-dream-tags-item" >{tag}</p>
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

        let followIcon;
        let editIcon;
        let deleteIcon;
        let flagIcon;
        let menuOptions;
        let optionsIcon;
        let like = <i
                        className="fas fa-heart"
                        onClick={() => this.like()}
                    >
                    </i>
        let unlike = <i 
                        className="far fa-heart"
                        // onClick={()=>this.unlike()}
                    >
                    </i>;


        // console.log('current', dream.username, currentUser.username)
        if (dream.username === currentUser.username) {
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
        } else {
            //!if (!comment.author.followers.includes(currentUser))
            followIcon = <div className="icon">
                            <i className="fas fa-user-plus"></i>
                        </div>
            flagIcon = <div className="icon">
                            <i className="fas fa-flag"></i>
                        </div>
        }

        if (this.state.showMenu) {
            optionsIcon = <p onClick={() => this.toggleMenu()}>✕</p>
            
            menuOptions = <div className='available-options'>
                {editIcon}
                {deleteIcon}
                {followIcon}
                {/* maybe links to a contact form with their username?*/}
                {flagIcon}
            </div>
        } else {
            optionsIcon = <i
                className="fas fa-ellipsis-h"
                onClick={() => this.toggleMenu()}>
                    <br />
                    {like}
                    {unlike}
            </i>
        }

        return (
            <div className={dream.type === "dream" ? "feed-dreams-wrapper" : "feed-goals-wrapper"} >
                <div className="comment-options" onClick={()=>this.toggleMenu()} >
                    {optionsIcon}
                    {menuOptions}
                </div>
                <div className={dream.type === "dream" ? "feed-dreams" : "feed-goals"}  onClick={this.handleOpenModal} >
                   {/* <Link to={`/dreams/${dream._id}`} style={{ textDecoration: 'none' }} > */}
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
                        <p className="feed-dreams-info" >
                            <Link to={`/users/${dream.userId}`} className="feed-dreams-info-link" style={{ textDecoration: 'none' }}>
                                {dream.username}
                            </Link>
                        </p>
                        <p className="feed-dreams-info" >{dream.text}</p>
                   {/* </Link> */}
                    <div className="feed-dreams-footer" >
                        <p className="feed-dreams-footer-info" >{dream.comments ? dream.comments.length : 0} <span className="feed-dreams-footer-comments" >{dream.comments && dream.comments.length === 1 ? "comment" : "comments"}</span></p>
                        <p className="feed-dreams-footer-info" >{this.state.numLikes} <span className="feed-dreams-footer-likes" >likes</span></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default DreamItem;