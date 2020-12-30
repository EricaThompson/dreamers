import React from 'react';
import { withRouter } from 'react-router-dom';
import Feed from '../feed/feed';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            selected: 'feed',
            userDreams: null
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSelected = this.handleSelected.bind(this);
    }

    componentDidMount() {
        // this.props.fetchDreamsByUser(this.props.match.params.userId)
        this.props.fetchDreams()
        console.log('profile state',this.props.dreams)
            // .then(res => this.setState({userDreams: res}))
    }

    // handleChange(e) {
    //     this.setState({ searchValue: e.target.value })
    // }

    handleSelected(type) {
        return (e) => {
            this.setState({ selected: type })
        }
    }

    render() {
        console.log('match params id',this.props.match.params.userId)
        console.log('dreams state', this.props.dreams)

        let { openModal } = this.props;
        // if (this.state.userDreams.length === 0) return null;
        return (
            <div className="profile-container">
                <div className="profile">
                    <div className='profile-pic'>
                        <i className="fas fa-cloud"></i>
                    </div>
                    <div className='user-info'>
                        <button
                            className="new-dream-btn"
                            onClick={() => openModal('newDream')} 
                        >
                            Create new dream
                        </button>
                        {/* <button
                            className="new-dream-btn"
                            // onClick={() => openModal('newDream')} 
                        >
                            Edit Profile
                        </button> */}
                        <div className="username">Username</div>
                        <div className="age">Age: 100</div>
                        <div className="about">
                            Here are a few things about me.
                            Here are a few things about me.
                            Here are a few things about me.
                        </div>
                        <button
                            className="new-dream-btn"
                            // onClick={() => openModal('newDream')} 
                        >
                            Follow
                        </button>
                    </div>
                </div>
                <div className="profile-dream-feed">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Feed 
                        userId={this.props.match.params.userId}
                        dreams={this.props.dreams}
                        openModal = {this.props.openModal}
                        fetchDreamsByUser = {this.props.fetchDreamsByUser}
                    />
                    {/* <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div> */}
                </div>
                
            </div>
        )
    }
}

export default withRouter(Profile);