import React from 'react';

class NewDream extends React.Component {
    render() {
        return (
            <div>
                <div className="radiobutton">
                    <label>Dream
                        <input
                            type="radio"
                            value="Dream"
                            // checked={this.state.selectedOption === "Dream"}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div className="radio">
                    <label>Goal
                        <input
                            type="radio"
                            value="Goal"
                            // checked={this.state.selectedOption === "Goal"}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div className="create-dream-container" >
                    <div className="create-dream-search-container" >
                        <i className="fas fa-search feed-search-icon"></i>
                        <form className="create-dream--search-form" >
                            <input type="text"
                                placeholder="Search tags, add tags, etc..."
                                // value={this.state.selectedOption}
                                onChange={this.handleChange}
                                className="create-dream-search-input" />
                        </form>
                    </div>
                </div>
                <div className="create-dream-container" >
                    <div className="create-dream-dreams" >
                        <p className="create-dream-text" >Dream Text</p>
                    </div>
                </div>
                <div>
                    {/* Selected option is : {this.state.selectedOption} */}
                </div>
                <button className="btn btn-default" type="Create Dream">
                Submit
                </button>
            </div>
        )
    }
}

export default NewDream;