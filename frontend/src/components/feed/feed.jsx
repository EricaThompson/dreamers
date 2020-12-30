import React from 'react';
import { Link } from 'react-router-dom';
import DreamItem from './dream_item';
import GoalItem from './goal_item';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // debugger;
        this.props.fetchDreams();
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }

    render() {
        let { openModal, dreams } = this.props;
        if ( dreams.length === 0 ) return null;

        let feed = Object.values(dreams).map((dream, idx) => {
            if (dream.type === "dream" ) {
                return <DreamItem key={idx} dream={dream} openModal={openModal} />
            } else {
                return <GoalItem key={idx} dream={dream} openModal={openModal} />
            }
        })

        return (
            <div className="feed-outer-container" >
                <div className="feed-container">
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
                    </div>
                </div>
                <div className="feed-dreams-outer-container" >
                    <div className="feed-dreams-container" >
                        <div>
                            {feed}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed;