import React from 'react';
import DreamItem from '../feed/dream_item';
import GoalItem from '../feed/goal_item';

class TagsFeed extends React.Component {
    componentDidMount() {
        
        this.props.fetchDreamsByTags([this.props.tagName]);
        this.props.closeModal();
    }

    
    render() {
        let { tagName, dreams, openModal } = this.props;

        let feed = Object.values(dreams).map((dream, idx) => {
            if (dream.type === "dream") {
                return <DreamItem key={idx} dream={dream} openModal={openModal} />
            } else {
                return <GoalItem key={idx} dream={dream} openModal={openModal} />
            }
        })

        return (
             <div className="tag-page-outer-container" >
                <div className="tag-page-tag-container" >
                        <div className="tag-page-circle" ></div>
                        <h1 className="tag-page-name" >{tagName}</h1>
                 </div>
                <div className="new-dream-tags" >
                    {feed}
                </div>
             </div>
        );
    }
}

export default TagsFeed;