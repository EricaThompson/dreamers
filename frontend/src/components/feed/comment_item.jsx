import React from 'react';
import { Link } from 'react-router-dom';

class CommentItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            showEditForm: false,
            comment: this.props.comment.comment

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount(){
    //     console.log('comment: ',this.props.comment)
    // }

    toggleEdit() {
        this.setState({ showEditForm: !this.state.showEditForm })
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu })
    }

    closeMenu() {
        this.setState({ showMenu: false })
    }

    handleChange() {
        return e => {
            this.setState({ comment: e.currentTarget.value })
        }
    }

    handleSubmit(){
        let comment = {
            username: this.props.comment.username,
            comment: this.state.comment
        }
        // debugger
        this.props.updateComment(this.props.comment._id, comment)
            .then(res => console.log('response: ',res))
            .catch(err => console.log('error: ',err))

        this.setState({showEditForm: false})

    }

    deleteComment(){
        console.log('deleted?')
        this.props.deleteComment(this.props.comment._id)
            .then(res => console.log(res))
    }

    render() {
        let { comment } = this.props;

        let followIcon;
        let editIcon;
        let editHide;
        let commentHide;
        let checkMark;
        let deleteIcon;
        let flagIcon;
        let menuOptions;
        let optionsIcon;
        // let optionsHide;

        if (comment.username === this.props.currentUser.username){
            optionsIcon = <i
                            className="fas fa-ellipsis-h"
                            onClick={() => this.toggleMenu()}>
                        </i>
            editIcon = <div
                            className="icon"
                            onClick={() => this.toggleEdit()}
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </div>
            deleteIcon = <div
                            className='icon'
                            onClick={()=>this.deleteComment()}
                        >
                            <i className="fas fa-trash-alt"></i>
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

        if (this.state.showEditForm) {
            editHide = false;
            checkMark = <i className="fas fa-check"></i>
            commentHide = true;
        } else {
            commentHide = false;
            editHide = true;
        }

        if (this.state.showMenu){
            optionsIcon = <p onClick={() => this.toggleMenu()}>✕</p>
            menuOptions = <div className='available-options'>
                            {editIcon}
                            {deleteIcon}
                            {followIcon}
                            {/* maybe links to a contact form with their username?*/}
                            {flagIcon}
                        </div>
        } else {
            
        }

        // console.log('comment', comment)
        // console.log('currentUser', this.props.currentUser)
        // if (comment.username === this.props.currentUser.username){
        //     console.log('same person')
        // }

        return (
            <div className="comment-item-outer-container" >
                <div 
                    className="comment-item-container"
                    // onClick={()=>this.closeMenu()}
                >
                    <div className="comment-item-text" >
                        <Link to={`/users/${comment.userId}`} 
                            style={{ textDecoration: 'none' }} 
                            className="comment-item-text-link" >
                                {comment.username}
                        </Link>
                        <div className='comment-options'>
                                {optionsIcon}
                                {menuOptions}
                        </div>
                    </div>
                    <p hidden={editHide} 
                        className="comment-item-text" >
                            <textarea
                                onClick={() => this.closeMenu()} 
                                onChange={this.handleChange()} 
                                className="edit-comment-input" 
                                value={this.state.comment} 
                            />
                            <span 
                                onClick={this.handleSubmit}>
                                    {checkMark}
                            </span>
                    </p>
                    <p hidden={commentHide} 
                        className="comment-item-text" 
                    >
                            {comment.comment}
                    </p>
                    {/* <p className="comment-item-text" >{comment.comment}</p> */}
                </div>
            </div>
        )
    }
}

export default CommentItem;