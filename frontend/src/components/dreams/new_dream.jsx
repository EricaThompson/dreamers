import React from 'react';

class NewDream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'dream',
            dreamText: '',
            searchValue: '',
            tags: ['KillingIt', 'Love', 'Teeth'],
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleTags = this.handleTags.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleChange(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }

    // handleTags(e) {
    //     let newTags = this.state.tags
    //     newTags.push(e.target.value)
    //     this.setState({ tags: newTags })
    // }

    removeTag(tag) {
        return (e) => {
            let newTags = this.state.tags
            let idx = newTags.indexOf(tag)
            delete newTags[idx]
            this.setState({ tags: newTags })
        }
    }

    render() {
        return (
            <div className="new-dream-container" onClick={e => e.stopPropagation()} >
                <h1 className="new-dream-header" >New Dream</h1>
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
                                <div className="new-dream-tags-item-container" onClick={this.removeTag(tag)}>
                                    <div className="new-dream-tags-item-circle" ></div>
                                    <p key={idx} className="new-dream-tags-item" >{tag}</p>
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

                    <input className="new-dream-btn create-dream-btn" type="submit" value="Create Dream"/>
                </div>
            </div>
        )
    }
}

export default NewDream;