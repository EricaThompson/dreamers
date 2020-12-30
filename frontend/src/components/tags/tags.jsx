import React from 'react';
import DreamItem from '../feed/dream_item';
import GoalItem from '../feed/goal_item';

class TagsFeed extends React.Component {
    componentDidMount() {
        // debugger;
        this.props.fetchDreamsByTags([this.props.tagName]);
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
             <div>
                 <h1>{tagName}</h1>
                <div className="new-dream-tags" >
                    {feed}
                </div>
             </div>
        );
    }
}

export default TagsFeed;