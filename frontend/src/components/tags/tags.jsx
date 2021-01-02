import React from 'react';
// import DreamItem from '../feed/dream_item';
// import GoalItem from '../feed/goal_item';
import Feed from '../feed/feed';

class TagsFeed extends React.Component {
    componentDidMount() {

        this.props.closeModal();
    }

    componentWillUnmount() {
        this.props.clearDreams();
    }
    
    render() {
        let { tagName, openModal, dreams, clearDreams, clearComments, fetchCommentsByDream, modalInfo } = this.props;

        // let feed = Object.values(dreams).map((dream, idx) => {
        //     if (dream.type === "dream") {
        //         return <DreamItem key={idx} dream={dream} openModal={openModal} />
        //     } else {
        //         return <GoalItem key={idx} dream={dream} openModal={openModal} />
        //     }
        // })

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
                        userId={this.props.match.params.userId}
                        dreams={dreams}
                        openModal={openModal}
                        clearDreams={clearDreams}
                        fetchDreamsByUser={this.props.fetchDreamsByUser}
                        clearComments={clearComments}
                        fetchCommentsByDream={fetchCommentsByDream}
                        modalInfo={modalInfo}
                    />
                </div>
            </div>
        );
    }
}

export default TagsFeed;