import React from 'react';
import DreamItem from './dream_item';
import { withRouter } from 'react-router-dom';
import SearchItem from './search_item';


class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            selected: 'feed',
            dreams: null,
            showClose: false,
            followed: {}
            //! may include spinner for loading views for UX
            // spinnerShow: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.hideShow = this.hideShow.bind(this);
    }

    componentDidMount() {
        this.setState({spinnerShow: true})
        this.props.closeModal();
        this.props.clearSearch();
        if (this.props.match.url.includes("feed")) {
            this.props.fetchDreams();
            this.props.fetchFollowedUsersDreams()
                .then(res => this.setState({ followed: res.data }))
        } 
            //!spinner
            // .then(this.setState({spinnerShow: false}))
    }

    componentWillUnmount() {
        this.props.clearDreams();
    }

    handleChange(e) {
        this.props.fetchSearchResults(e.target.value);
        this.setState({ searchValue: e.target.value, showClose: true })
    }

    handleSelected(type) {
        return () => {
            this.setState({ selected: type })
        }
    }

    hideShow() {
        this.props.clearSearch();
        this.setState({ showClose: false, searchValue: '' })
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
            createLike,
            deleteLike,
            fetchLike,
            like,
            fetchLikesByDream,
            searchResults,
            clearSearch
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
                    deleteLike={deleteLike}
                    fetchLike={fetchLike}
                    like={like}
                    fetchLikesByDream={fetchLikesByDream}
                />
            })
        } else if (this.state.selected === "followed") {
            feed = Object.values(this.state.followed).map((dream, idx) => {
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
                    deleteLike={deleteLike}
                    fetchLike={fetchLike}
                    like={like}
                    fetchLikesByDream={fetchLikesByDream}
                />
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
                        deleteLike={deleteLike}
                        fetchLike={fetchLike}
                        like={like}
                        fetchLikesByDream={fetchLikesByDream}
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
                        deleteLike={deleteLike}
                        fetchLike={fetchLike}
                        like={like}
                        fetchLikesByDream={fetchLikesByDream}
                        />
                } else {
                    return ""
                }
            })
        }
        //!spinner
        // let spinner;

        // if (this.state.spinnerShow){
        //     spinner = <i className="fas fa-asterisk fa-spin"></i>
        // }

        let search;
        if (Object.values(searchResults).length > 0 && !this.props.isModalOpen){

            search = <div className="search-results-outer-container" >
                {Object.values(searchResults.dreams).map((result, idx) => {
                    return <SearchItem 
                                key={idx} 
                                dream={result} 
                                type={"dream"} 
                                text={result.text} 
                                clearComments={clearComments} 
                                fetchCommentsByDream={fetchCommentsByDream} 
                                openModal={openModal} 
                                modalInfo={modalInfo} 
                                clearSearch={clearSearch} 
                            />
                })}
                {Object.values(searchResults.tags).map((result, idx) => {
                    return <SearchItem 
                                key={idx} 
                                dream={result} 
                                type={"tag"} 
                                text={result.name} 
                            />
                })}
                {Object.values(searchResults.users).map((result, idx) => {
                    return <SearchItem 
                                key={idx} 
                                dream={result} 
                                type={"users"} 
                                text={result.username} 
                            />
                })}
            </div>
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
                        {search}
                        <i 
                            onClick={this.hideShow} 
                            className={
                                this.state.showClose 
                                ? "fas fa-times-circle close-search-btn" 
                                : ''}
                        >
                        </i>
                    </div>
                    <div className="feed-index-container" >
                        <div className="feed-header-container">
                            <h1 className={
                                this.state.selected === 'feed' 
                                ? "feed-header feed-header-selected" 
                                : "feed-header"} 
                                onClick={this.handleSelected('feed')}
                                >Feed</h1>
                            {this.props.location.pathname.includes('feed') 
                                ? <h1 className={
                                    this.state.selected === 'followed'
                                        ? "feed-header feed-header-selected"
                                        : "feed-header"}
                                    onClick={this.handleSelected('followed')}
                                >Followed</h1>
                                : ''
                            }
                            <h1 
                                className={
                                    this.state.selected === 'dreams' 
                                        ? "feed-header feed-header-selected" 
                                        : "feed-header"} 
                                onClick={this.handleSelected('dreams')}
                            >Dreams</h1>
                            <h1 
                                className={this.state.selected === 'goals' 
                                ? "feed-header feed-header-selected" 
                                : "feed-header"} 
                                onClick={this.handleSelected('goals')}
                            >
                                Goals
                            </h1>
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
            </div>
        )
    }
}

export default withRouter(Feed);