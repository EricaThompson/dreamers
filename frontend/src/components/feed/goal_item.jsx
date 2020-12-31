import React from 'react';
import { Link } from 'react-router-dom';

const GoalItem = ({ dream, openModal }) => {
    return (
        <div className="feed-goals-wrapper" >
            <div className="feed-goals">
                <Link to="/feed" style={{ textDecoration: 'none' }} >
                    <div className="new-dream-tags-container" >
                        <div className="new-dream-tags" >
                            {dream.tags.map((tag, idx) => {
                                return (
                                    <Link to="/feed" key={idx} style={{ textDecoration: 'none' }} >
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
                    <div className="feed-goals-footer" >
                        <p className="feed-goals-footer-info" >3 <span onClick={() => openModal('commentGoal')} className="feed-goals-footer-comments" >comments</span></p>
                        <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-likes" >likes</span></p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default GoalItem;