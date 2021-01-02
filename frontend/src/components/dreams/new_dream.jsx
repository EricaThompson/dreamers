import React from 'react';

class NewDream extends React.Component {
    constructor(props) {
        super(props);
        if (Object.values(this.props.info).length === 0) {
            // debugger;
            this.state = {
                selectedOption: 'dream',
                dreamText: '',
                searchValue: '',
                tags: ['KillingIt', 'Love', 'Teeth'],
            }
        } else {
            // debugger;
            this.state = {
                selectedOption: this.props.info.type,
                dreamText: this.props.info.text,
                searchValue: '',
                tags: this.props.info.tags,
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleChange(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let newDream = {
            username: this.props.currentUser.username,
            userId: this.props.currentUser.id,
            type: this.state.selectedOption,
            text: this.state.dreamText,
            tags: this.state.tags
        }
        // debugger;
        if (this.props.info.userId) {
            this.props.updateDream(this.props.info._id, newDream);
            console.log('update dream', { dream: newDream })
        } else {
            console.log('new dream', newDream)
            this.props.createDream({dream: newDream});
        }
    }

    handleTags(e) {
        let newTags = this.state.tags
        newTags.push(e.target.value)
        this.setState({ tags: newTags })
    }

    removeTag(tag) {
        return (e) => {
            let newTags = this.state.tags
            let idx = newTags.indexOf(tag)
            delete newTags[idx]
            // debugger;
            this.setState({ tags: newTags })
        }
    }

    render() {
        return (
            <div className="new-dream-container" onClick={e => e.stopPropagation()} >
                <h1 className="new-dream-header" >{Object.values(this.props.info).length === 0 ? "New Dream" : "Edit Dream"}</h1>
                <form className="new-dream-radio">
                    <label className="new-dream-radio-btn" >
                        <h1 className={this.state.selectedOption === 'dream' ? "new-dream-radio-btn-header-checked" : "new-dream-radio-btn-header"} >Dream</h1>
                        <input
                            type="radio"
                            value="dream"
                            checked={this.state.selectedOption === "dream"}
                            onChange={this.handleChange('selectedOption')}
                        />
                    </label>
                    <label className="new-dream-radio-btn" >
                        <h1 className={this.state.selectedOption === 'goal' ? "new-dream-radio-btn-header-checked" : "new-dream-radio-btn-header"} >Goal</h1>
                        <input
                            type="radio"
                            value="goal"
                            checked={this.state.selectedOption === "goal"}
                            onChange={this.handleChange('selectedOption')}
                        />
                    </label>
                </form>
                <div className="new-dream-tags-container" >
                    <h1 className="new-dream-tags-header" >Tags:</h1>
                    <div className="new-dream-tags" >
                        {this.state.tags.map((tag, idx) => {
                            return (
                                <div key={idx} className="new-dream-tags-item-container" onClick={this.removeTag(tag)}>
                                    <div className="new-dream-tags-item-circle" ></div>
                                    <p className="new-dream-tags-item" >{tag}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="create-dream-container" >
                    <div className="create-dream-search-container" >
                        <i className="fas fa-search dream-search-icon"></i>
                        <form className="create-dream-search-form" >
                            <input type="text"
                                placeholder="Add tags or create a new one..."
                                value={this.state.searchValue}
                                onChange={this.handleChange('searchValue')}
                                className="create-dream-search-input" />
                        </form>
                    </div>
                </div>
                <div className="create-dream-container" >
                    <form className="create-dream-text-container" >
                        <textarea 
                            className="create-dream-textarea" 
                            placeholder="Share your dreams..."
                            value={this.state.dreamText}
                            onChange={this.handleChange('dreamText')}></textarea>
                    </form>
                </div>
                <div className="create-dream-btn" >
                    <input className="new-dream-btn" 
                        type="submit" 
                        value={Object.values(this.props.info).length === 0 ? "Create Dream" : "Edit Dream"}
                        onClick={this.handleSubmit} 
                        />
                </div>
            </div>
        )
    }
}

export default NewDream;