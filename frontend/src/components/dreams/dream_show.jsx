import React from 'react';
import { Link } from 'react-router-dom';

class DreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchDreamById(this.props.match.params.dreamId);
    }

    render() {
        return (
            <div className="dream-show-modal-outer-container">
                <div className="dream-show-dreams-container" >
                    <div className="dream-show-dreams" >
                        <p className="dream-show-dreams-info" >
                            <Link to="/"
                            // to={`/users/${info.userId}`} 
                            className="dream-show-dreams-info" style={{ textDecoration: 'none' }}>
                                {/* {info.username} */}
                                USERNAME
                            </Link>
                        </p>
                        <p className="dream-show-dreams-info" >
                            THE DREAM TEXT
                            {/* {info.text} */}
                        </p>
                        <form className="dream-show-form" >
                            <label className="dream-show-label" >
                                <textarea className="dream-show-input" type="text" placeholder="Leave your comment here" />
                            </label>
                            <div className="dream-show-btn-container">
                                <input className="dream-show-btn" type="submit" value="Create Comment" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="dream-show-dreams-container" >
                    <div className="dream-show-goals" >
                        <p className="dream-show-goals-info" >
                            <Link to="/"
                                // to={`/users/${info.userId}`} 
                                className="dream-show-goals-info" style={{ textDecoration: 'none' }}>
                                {/* {info.username} */}
                                USERNAME
                            </Link>
                        </p>
                        <p className="dream-show-goals-info" >
                            THE DREAM TEXT
                            {/* {info.text} */}
                        </p>
                        <form className="dream-show-form" >
                            <label className="dream-show-label" >
                                <textarea className="dream-show-input" type="text" placeholder="Leave your comment here" />
                            </label>
                            <div className="dream-show-btn-container">
                                <input className="dream-show-btn" type="submit" value="Create Comment" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DreamShow;