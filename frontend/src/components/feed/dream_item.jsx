import React from 'react';
import { Link } from 'react-router-dom';

const DreamItem = ({ dream, openModal }) => {
    return (
        <div className="feed-dreams-wrapper" >
            <div className="feed-dreams" >
                <Link to="/feed" style={{ textDecoration: 'none' }} >
                    <div className="feed-dreams-circle-big" ></div>
                    <div className="feed-dreams-circle-small" ></div>
                    <div className="new-dream-tags-container" >
                        <div className="new-dream-tags" >
                            {dream.tags.map((tag, idx) => {
                                return (
                                    <Link to="/feed" key={idx} style={{ textDecoration: 'none' }} >
                                        <div className="new-dream-tags-item-container"                                     >
                                            <div className="new-dream-tags-item-circle" ></div>
                                            <p  className="new-dream-tags-item" >{tag}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    
                    <p className="feed-dreams-info" >
                        <Link to={`/users/${dream.userId}`} className="feed-dreams-info" style={{ textDecoration: 'none' }}>
                            {dream.username}
                        </Link>
                    </p>
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