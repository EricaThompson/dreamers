import React from 'react';
// import { Link } from 'react-router-dom';
import DreamItem from './dream_item';
// import GoalItem from './goal_item';
import { withRouter } from 'react-router-dom';


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

    componentDidMount() {
        // debugger;
        this.props.closeModal();
        if (this.props.match.url.includes("feed") )
        this.props.fetchDreams();
    }

    // componentWillReceiveProps(nextProps){
    //     nextProps.fetchDreamsByUser(nextProps.userId)
    //         .then(res => this.setState({dreams: res}))
    // }
    componentWillUnmount() {
        this.props.clearDreams();
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }

    handleSelected(type) {
        return (e) => {
            this.setState({ selected: type })
        }
    }

    render() {
        let { 
            openModal, 
            modalInfo, 
            dreams, 
            fetchCommentsByDream, 
            clearComments, 
            currentUser,
            deleteDream,
            createLike 
        } = this.props;
        
        if ( !dreams ) return null;

        let feed; 

        if (this.state.selected === "feed") {
            feed = Object.values(dreams).map((dream, idx) => {
                return <DreamItem
                    key={idx}
                    tags={dream.tags}
                    dream={dream}
                    openModal={openModal}
                    modalInfo={modalInfo}
                    fetchCommentsByDream={fetchCommentsByDream}
                    clearComments={clearComments}
                    currentUser={currentUser}
                    deleteDream={deleteDream}
                    createLike={createLike}
                />
                // console.log('map dream',dream)
                // if (dream.type === "dream" ) {
                //     return <DreamItem 
                //         key={idx} 
                //         tags={dream.tags} 
                //         dream={dream} 
                //         openModal={openModal} 
                //         modalInfo={modalInfo} 
                //         fetchCommentsByDream={fetchCommentsByDream} 
                //         clearComments={clearComments} 
                //         currentUser={currentUser}
                //         deleteDream={this.props.deleteDream}
                //     />
                // } else {
                //     return <GoalItem 
                //         key={idx} 
                //         tags={dream.tags} 
                //         dream={dream} 
                //         openModal={openModal} 
                //         modalInfo={modalInfo} 
                //         fetchCommentsByDream={fetchCommentsByDream} 
                //         clearComments={clearComments} 
                //         currentUser={currentUser}
                //         deleteDream={this.props.deleteDream} 
                //     />
                // }
            })
        } else if (this.state.selected === "dreams") {
            feed = Object.values(dreams).map((dream, idx) => {
                if (dream.type === "dream") {
                    return <DreamItem 
                        key={idx} 
                        tags={dream.tags} 
                        dream={dream} 
                        openModal={openModal} 
                        modalInfo={modalInfo} 
                        fetchCommentsByDream={fetchCommentsByDream} 
                        clearComments={clearComments} 
                        currentUser={currentUser}
                        deleteDream={deleteDream}
                    />
                } else {
                    return ""
                }
            })
        } else if (this.state.selected === "goals") {
            feed = Object.values(dreams).map((dream, idx) => {
                if (dream.type === "goal") {
                    return <DreamItem 
                        key={idx} 
                        tags={dream.tags} 
                        dream={dream} 
                        openModal={openModal} 
                        modalInfo={modalInfo} 
                        fetchCommentsByDream={fetchCommentsByDream} 
                        clearComments={clearComments} 
                        currentUser={currentUser}
                        deleteDream={deleteDream} 
                        />
                } else {
                    return ""
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
                <div className="feed-dreams-bottom" ></div>
                {/* <div className="feed-dreams-blur" ></div> */}
            </div>
        )
    }
}

export default withRouter(Feed);