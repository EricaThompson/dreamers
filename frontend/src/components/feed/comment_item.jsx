import React from 'react';
import { Link } from 'react-router-dom';

class CommentItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showEditForm: false,
        }
    }

    toggleEdit() {
        this.setState({ showEditForm: !this.state.showEditForm })
    }

    

    render() {
        let { comment } = this.props;

        let editShow = false;
        let commentShow = true;

        if (this.state.showEditForm) {
            editShow = true;
            commentShow = false;
        } else {
            commentShow = true;
            editShow = false;
        }


        return (
            <div className="comment-item-outer-container" >
                <div className="comment-item-container">
                    <p className="comment-item-text" >
                        <Link to={`/users/${comment.userId}`} style={{ textDecoration: 'none' }} className="comment-item-text-link" >
                            {comment.username}
                        </Link>
                        <div
                            className="edit-icon"
                            onClick={() => this.toggleEdit()}
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </div>
                    </p>
                    <p hidden={editShow} className="comment-item-text" ><input value={comment.comment + 'edit'} /></p>
                    <p hidden={commentShow} className="comment-item-text" >{comment.comment}</p>
                    {/* <p className="comment-item-text" >{comment.comment}</p> */}
                </div>
            </div>
        )
    }
}

export default CommentItem;