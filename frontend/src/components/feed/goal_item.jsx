import React from 'react';
import { Link } from 'react-router-dom';

const GoalItem = ({ dream, openModal }) => {
    return (
        <div className="feed-goals-wrapper" >
            <div className="feed-goals">
                <Link to="/feed" style={{ textDecoration: 'none' }} >
                    <p className="feed-goals-info" >username</p>
                    <p className="feed-goals-info" >{dream.text}</p>
                    <div className="feed-goals-footer" >
                        <p className="feed-goals-footer-info" >3 <span onClick={() => openModal('comment')} className="feed-goals-footer-comments" >comments</span></p>
                        <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-likes" >likes</span></p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default GoalItem;