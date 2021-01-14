import React from 'react';
import Feed from '../feed/feed';

class TagsFeed extends React.Component {
    componentDidMount() {
        this.props.fetchDreamsByTags({ tags: [this.props.tagName] });
        this.props.closeModal();
        this.props.clearSearch();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            window.location.reload();
        }
    }

    componentWillUnmount() {
        this.props.clearDreams();
    }
    
    render() {
        let { tagName, openModal, dreams, clearDreams, clearComments, fetchCommentsByDream, modalInfo, currentUser, closeModal, fetchLike, createLike, deleteLike, fetchLikesByDream } = this.props;

        return (
            <div className="profile-container">
                <div className="profile">
                
                <div className="tag-page-outer-container" >
                    <div className="tag-page-tag-container" >
                            <div className="tag-page-circle" ></div>
                            <h1 className="tag-page-name" >{tagName}</h1>
                    </div>
                </div>
                </div>
                <div className="profile-dream-feed">
                    <Feed
                        currentUser={currentUser}
                        userId={this.props.match.params.userId}
                        dreams={dreams}
                        openModal={openModal}
                        clearDreams={clearDreams}
                        fetchDreamsByUser={this.props.fetchDreamsByUser}
                        clearComments={clearComments}
                        fetchCommentsByDream={fetchCommentsByDream}
                        modalInfo={modalInfo}
                        closeModal={closeModal}
                        searchResults={this.props.searchResults}
                        fetchSearchResults={this.props.fetchSearchResults}
                        clearSearch={this.props.clearSearch}
                        isModalOpen={this.props.isModalOpen}
                        fetchLike={fetchLike}
                        createLike={createLike}
                        deleteLike={deleteLike}
                        fetchLikesByDream={fetchLikesByDream}
                    />
                </div>
            </div>
        );
    }
}

export default TagsFeed;