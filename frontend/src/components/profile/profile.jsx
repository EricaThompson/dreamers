import { set } from 'mongoose';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Feed from '../feed/feed';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            selected: 'feed',
            userDreams: null,
            currentUser: this.props.currentUser,
            //!temporary
            thisUser: {
                id: 2385280, 
                username: 'tester', 
                location: 'the cloud', 
                age: 100, 
                bio: 'Here are a few things about me. Here are a few things about me. Here are a few things about me.'}
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSelected = this.handleSelected.bind(this);
    }

    componentDidMount() {
        // this.props.fetchDreamsByUser(this.props.match.params.userId)
        this.props.fetchDreams()
            .then(res => this.setState({userDreams: Object.values(res)[1].data}))
        console.log('props dreams',this.props.dreams)
        console.log('state dreams', this.state.userDreams)
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
        console.log('state dreams', this.state.userDreams)

        let editBtn;
        let followBtn;
        //! change this when we get getUserById action
        if (this.state.thisUser.id === this.state.currentUser.id){
            editBtn = <button className="profile-edit-button">
                        edit profile
                    </button>
            
        } else {
            followBtn = <button
                        className="new-dream-btn"
                        // onClick={() => openModal('newDream')} 
                    >
                        Follow
                    </button>
        }

        let { openModal } = this.props;
        // if (this.state.userDreams.length === 0) return null;
        return (
            <div className="profile-container">
                <div className="profile">
                    
                    <div className='profile-pic'>
                        <i className="fas fa-cloud"></i>
                    </div>
                    <div className='user-info'>
                        {editBtn}
                        <button
                            className="new-dream-btn"
                            onClick={() => openModal('newDream')} 
                        >
                            Create new dream
                        </button>
                        <div className="username">@{this.state.thisUser.username}</div>
                        <div>Location: {this.state.thisUser.location}</div>
                        <div className="age">Age: {this.state.thisUser.age}</div>
                        <div className="about">
                            {this.state.thisUser.bio}
                        </div>
                        {followBtn}
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