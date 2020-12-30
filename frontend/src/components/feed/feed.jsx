import React from 'react';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }

    render() {
        let { openModal } = this.props;
        return (
            <div className="feed-container" >
                <div className="feed-search-container" >
                    <i className="fas fa-search feed-search-icon"></i>
                    <form className="feed-search-form" >
                        <input type="text" 
                            placeholder="Search tags, users, etc..."
                            value={this.state.searchValue}
                            onChange={this.handleChange}
                            className="feed-search-input" />
                    </form>
                </div>
                <div className="feed-index-container" >
                    <div className="feed-header-container">
                        <h1 className="feed-header feed-header-feed" >Feed</h1>
                        <h1 className="feed-header feed-header-dreams" >Dreams</h1>
                        <h1 className="feed-header feed-header-goals" >Goals</h1>
                    </div>
                    <div className="feed-dreams-outer-container" >
                        <div className="feed-dreams-container" >
                            <div className="feed-dreams" >
                                <Link to="/feed" style={{ textDecoration: 'none' }} >
                                    <div className="feed-dreams-circle-big" ></div>
                                    <div className="feed-dreams-circle-small" ></div>
                                    <p className="feed-dreams-info" >username</p>
                                    <p className="feed-dreams-info" >this is the text of a dream</p>
                                    <div className="feed-dreams-footer" >
                                        <p className="feed-dreams-footer-info" >3 <span onClick={() => openModal('comment')} className="feed-dreams-footer-comments" >comments</span></p>
                                        <p className="feed-dreams-footer-info" >3 <span className="feed-dreams-footer-likes" >likes</span></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="feed-dreams-container" >
                            <div className="feed-goals" >
                                <Link to="/feed" style={{ textDecoration: 'none' }} >
                                    <p className="feed-goals-info" >username</p>
                                    <p className="feed-goals-info" >this is the text of a goal</p>
                                    <div className="feed-goals-footer" >
                                        <p className="feed-goals-footer-info" >3 <span onClick={() => openModal('comment')} className="feed-goals-footer-comments" >comments</span></p>
                                        <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-likes" >likes</span></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed;