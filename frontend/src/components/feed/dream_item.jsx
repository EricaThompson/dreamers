import React from 'react';
import { Link } from 'react-router-dom';

class DreamItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.tags,
            showMenu: false,
            likes: [],
            numLikes: null,
            // currentLike: '',
            propLikes: null,
            timestamp: null
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.refreshAfterDelete = this.refreshAfterDelete.bind(this)
    }

    componentDidMount(){
        // this.props.fetchLike(this.props.dream._id)
        this.props.fetchLikesByDream(this.props.dream._id)
            .then(res => this.setState({likes: res.likes}))
            .then(this.setState({propLikes: this.props.like}))
        
        this.setState({ timestamp: this.props.dream._id.toString().substring(0, 8)})


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
            .then(res => this.setState({currentLike: res.like._id}))
        window.location.reload()
    }

    unlike(){
        this.state.likes.forEach(like=>{
            // debugger;
            if (like.username === this.props.currentUser.username){
                this.props.deleteLike(like._id)
            }
        })
        //!fix
        window.location.reload()
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
        // console.log('like?', this.state.numLikes)
        // console.log('current like',this.state.currentLike)

        let { dream, 
            currentUser, 
            // createLike
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
                            <Link to={`/tags/${tag}`} key={idx} style={{ textDecoration: 'none' }} >
                                <div className="new-dream-tags-item-container" onClick={e => e.stopPropagation()} >
                                    <div className={dream.type === "dream" ? "new-dream-tags-item-circle" : "new-goal-tags-item-circle"} ></div>
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
        let likeIcon;
        // let unlike;

        // if (this.state.currentLike){
        //     unlike = <i
        //         className="fas fa-heart"
        //     // onClick={()=>this.unlike()}
        //     >
        //     </i>;


        // } else {
        //     like = <i
        //         className="far fa-heart"
        //         onClick={() => this.like()}
        //     >
        //     </i>
        // }


        // if (dream.username){
        //     console.log(dream.username)
        // }

        ////////////////////////////

        likeIcon = <i
            className="far fa-heart"
            onClick={() => this.like()}
        >
        </i>

        //! likes functionality
        if (this.state.likes){
            // console.log(this.state.likes)
            this.state.likes.forEach(like => {
                
                if(like.username === currentUser.username){
                    likeIcon = <i
                        className="fas fa-heart"
                        onClick={()=>this.unlike()}
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


        // this.state.likes.forEach(like => {

        // })

        

        
        


        // console.log('current', dream.username, currentUser.username)
        if (dream.username === currentUser.username) {
            optionsIcon = <i
                            className="fas fa-ellipsis-h"
                            onClick={() => this.toggleMenu()}>
                            <br />
                            {likeIcon}
                            {/* {unlike} */}
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
        } else {
            //!if (!comment.author.followers.includes(currentUser))
            // followIcon = <div className="icon">
            //                 <i className="fas fa-user-plus"></i>
            //             </div>
            // flagIcon = <div className="icon">
            //                 <i className="fas fa-flag"></i>
            //             </div>
        }

        if (this.state.showMenu) {
            optionsIcon = <p onClick={() => this.toggleMenu()}>✕</p>
            
            menuOptions = <div className='available-options'>
                {editIcon}
                {deleteIcon}
                {/* {followIcon} */}
                {/* maybe links to a contact form with their username?*/}
                {/* {flagIcon} */}
            </div>
        } else if (dream.username === currentUser.username){
            optionsIcon = <i
                className="fas fa-ellipsis-h"
                onClick={() => this.toggleMenu()}>
                    <br />
                    
                    {/* {unlike} */}
            </i>
        }

        

        // console.log(dream._id)

        return (
            <div className={dream.type === "dream" ? "feed-dreams-wrapper" : "feed-goals-wrapper"} onClick={this.handleOpenModal}>
                <div className="comment-options" onClick={() => this.toggleMenu(), (e) => e.stopPropagation() } >
                    {optionsIcon}
                    <br />
                    {likeIcon}
                    {menuOptions}
                </div>

                {/* <div onClick={(e) => e.stopPropagation()}>
                    {optionsIcon}
                    {menuOptions}
                </div> */}
                <div className={dream.type === "dream" ? "feed-dreams" : "feed-goals"}   >
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
                    <div className="feed-dreams-info" >
                            <Link to={`/users/${dream.userId}`} className="feed-dreams-info-link" style={{ textDecoration: 'none' }}>
                                {dream.username} 
                            {/* <br /> */}
                            </Link>
                            <p className='dream-item-date'>{month} {date.getDate()}, {date.getFullYear()}</p>
                        </div>
                        <p className="feed-dreams-info" >{dream.text}</p>
                   {/* </Link> */}
                    <div className="feed-dreams-footer" >
                        <p className="feed-dreams-footer-info" >{dream.comments ? dream.comments.length : 0} <span className="feed-dreams-footer-comments" >{dream.comments && dream.comments.length === 1 ? "comment" : "comments"}</span></p>
                        <p className="feed-dreams-footer-info" >{this.state.likes.length} <span className="feed-dreams-footer-likes" >{this.state.likes.length === 1 ? "like" : "likes"}</span></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default DreamItem;