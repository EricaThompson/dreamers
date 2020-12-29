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
                                <Link style={{ textDecoration: 'none' }} >
                                    <p className="feed-dreams-info" >username</p>
                                    <p className="feed-dreams-info" >this is the text of a dream</p>
                                    <p className="feed-dreams-info" >3 comments</p>
                                    <p className="feed-dreams-info" >3 likes</p>
                                </Link>
                            </div>
                        </div>
                        <div className="feed-dreams-container" >
                            <div className="feed-goals" >
                                <Link style={{ textDecoration: 'none' }} >
                                    <p className="feed-dreams-info" >username</p>
                                    <p className="feed-dreams-info" >this is the text of a goal</p>
                                    <p className="feed-dreams-info" >3 comments</p>
                                    <p className="feed-dreams-info" >3 likes</p>
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