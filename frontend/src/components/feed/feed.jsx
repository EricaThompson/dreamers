import React from 'react';
// import { Link } from 'react-router-dom';
import DreamItem from './dream_item';
import GoalItem from './goal_item';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            selected: 'feed',
            dreams: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
    }

    // componentDidMount() {
    //     this.props.fetchDreams();
    // }

    // componentWillReceiveProps(nextProps){
    //     nextProps.fetchDreamsByUser(nextProps.userId)
    //         .then(res => this.setState({dreams: res}))
    // }

    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }

    handleSelected(type) {
        return (e) => {
            this.setState({ selected: type })
        }
    }

    render() {
        let { openModal, dreams } = this.props;
        if ( dreams.length === 0 ) console.log("nothing here");

        let feed; 
        
        if (this.state.selected === "feed") {
            feed = Object.values(dreams).map((dream, idx) => {
                if (dream.type === "dream" ) {
                    return <DreamItem key={idx} dream={dream} openModal={openModal} />
                } else {
                    return <GoalItem key={idx} dream={dream} openModal={openModal} />
                }
            })
        } else if (this.state.selected === "dreams") {
            feed = Object.values(dreams).map((dream, idx) => {
                if (dream.type === "dream") {
                    return <DreamItem key={idx} dream={dream} openModal={openModal} />
                }
            })
        } else if (this.state.selected === "goals") {
            feed = Object.values(dreams).map((dream, idx) => {
                if (dream.type === "goal") {
                    return <GoalItem key={idx} dream={dream} openModal={openModal} />
                }
            })
        }

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
                            <h1 className={this.state.selected === 'feed' ? "feed-header feed-header-selected" : "feed-header"} 
                                onClick={this.handleSelected('feed')}
                            >Feed</h1>
                            <h1 className={this.state.selected === 'dreams' ? "feed-header feed-header-selected" : "feed-header"} 
                                onClick={this.handleSelected('dreams')}
                            >Dreams</h1>
                            <h1 className={this.state.selected === 'goals' ? "feed-header feed-header-selected" : "feed-header"} 
                                onClick={this.handleSelected('goals')}
                            >Goals</h1>
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