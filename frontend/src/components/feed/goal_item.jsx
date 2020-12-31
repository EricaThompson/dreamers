import React from 'react';
import { Link } from 'react-router-dom';

class GoalItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal(e) {
        this.props.clearComments();
        this.props.fetchCommentsByDream(this.props.dream._id);
        this.props.openModal('commentGoal');
        this.props.modalInfo(this.props.dream);
    }

    render() {
        let { dream } = this.props;

        return (
            <div className="feed-goals-wrapper" >
                <div className="feed-goals" onClick={this.handleOpenModal} >
                    {/* <Link to={`/dreams/${dream._id}`} style={{ textDecoration: 'none' }} > */}
                        <div className="new-dream-tags-container" >
                            <div className="new-dream-tags" >
                                {dream.tags.map((tag, idx) => {
                                    return (
                                        <Link to={`/tags/${tag}`} key={idx} style={{ textDecoration: 'none' }} >
                                            <div className="new-dream-tags-item-container"                                     >
                                                <div className="new-dream-tags-item-circle" ></div>
                                                <p className="new-dream-tags-item" >{tag}</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <p className="feed-goals-info" >
                            <Link to={`/users/${dream.userId}`} className="feed-goals-info" style={{ textDecoration: 'none' }}>
                                {dream.username}
                            </Link>
                        </p>
                        <p className="feed-goals-info" >{dream.text}</p>
                    {/* </Link> */}
                    <div className="feed-goals-footer" >
                        <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-comments" >comments</span></p>
                        <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-likes" >likes</span></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default GoalItem;