import React from 'react';
import { Link } from 'react-router-dom';

const DreamItem = ({ dream, openModal }) => {
    return (
        <div className="feed-dreams-wrapper" >
            <div className="feed-dreams" >
                <Link to="/feed" style={{ textDecoration: 'none' }} >
                    <div className="feed-dreams-circle-big" ></div>
                    <div className="feed-dreams-circle-small" ></div>
                    <p className="feed-dreams-info" >username</p>
                    <p className="feed-dreams-info" >{dream.text}</p>
                    <div className="feed-dreams-footer" >
                        <p className="feed-dreams-footer-info" >3 <span onClick={() => openModal('commentDream')} className="feed-dreams-footer-comments" >comments</span></p>
                        <p className="feed-dreams-footer-info" >3 <span className="feed-dreams-footer-likes" >likes</span></p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DreamItem;