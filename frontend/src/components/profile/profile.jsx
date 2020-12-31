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
            profileUser: this.props.user,
            // timestamp: null
        }

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSelected = this.handleSelected.bind(this);
    }

    componentDidMount() {
        this.props.fetchDreamsByUser(this.props.match.params.userId)
        this.props.fetchUserById(this.props.match.params.userId)
            .then(res => this.setState({ profileUser: res.user, timestamp: res.user.createdAt }, console.log('this user',res.user)))
            // .then(res => console.log(res))
        // this.props.fetchDreams()
            // .then(res => this.setState({userDreams: Object.values(res).data}))
        // debugger
        console.log('props dreams',this.props.dreams)
        console.log('state dreams', this.state.userDreams)
            // .then(res => this.setState({userDreams: res}))
        
        this.props.closeModal()

    }

    // handleChange(e) {
    //     this.setState({ searchValue: e.target.value })
    // }

    handleSelected(type) {
        return (e) => {
            this.setState({ selected: type })
        }
    }

    // componentDidMount() {
    //     this.props.closeModal();
    // }

    render() {
        console.log('match params id',this.props.match.params.userId)
        console.log('dreams state', this.props.dreams)
        console.log('state dreams', this.state.userDreams)
        // if (!dreams)
        
        let editBtn;
        let newDreamBtn;
        let followBtn;

        if (this.props.match.params.userId === this.state.currentUser.id){
            editBtn = <button className="profile-edit-button">
                        edit profile
                    </button>
            newDreamBtn = <button
                            className="new-dream-btn"
                            onClick={() => openModal('newDream')}
                        >
                            Create new dream
                        </button>
            
        } else {
            followBtn = <button
                        className="new-dream-btn"
                        // onClick={() => openModal('newDream')} 
                    >
                        Follow
                    </button>
        }

        let { openModal, dreams, clearDreams } = this.props;
        if (!dreams) return null;
        console.log('user', this.props.user._id.toString().substring(0, 8))
        // console.log(this.state.timestamp.getMonth())

        let timestamp = this.state.profileUser._id.toString().substring(0, 8)
        let date = new Date(parseInt(timestamp, 16) * 1000)
        let month = date.getMonth()

        switch (month) {
            case 0:
                month = "Jan"
                break;
            case 1:
                month = "Feb"
                break;
            case 2:
                month = "Mar"
                break;
            case 3:
                month = "Apr"
                break;
            case 4:
                month = "May"
                break;
            case 5:
                month = "Jun"
                break;
            case 6:
                month = "Jul"
                break;
            case 7:
                month = "Aug"
                break;
            case 8:
                month = "Sep"
                break;
            case 9:
                month = "Oct"
                break;
            case 10:
                month = "Nov"
                break;
            case 11:
                month = "Dec"
                break;

            default:
                break;
        }

        return (
            <div className="profile-container">
                <div className="profile">
                    
                    <div className='profile-pic'>
                        <i className="fas fa-cloud"></i>
                    </div>
                    <div className='user-info'>
                        {editBtn}
                        {newDreamBtn}
                        
                        <div className="username">{this.state.profileUser.username}</div>
        <div>Dreamer since: {month} {date.getDate()} {date.getFullYear()}</div>
                        <div>Location: {this.state.profileUser.location}</div>
                        <div className="age">Age: {this.state.profileUser.age}</div>
                        <div className="about">
                            Bio: {this.state.profileUser.bio}
                        </div>
                        {/* <div>Followers: {this.state.thisUser.followers.length}</div> */}
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
                    
                    <Feed 
                        userId={this.props.match.params.userId}
                        dreams={dreams}
                        openModal = {openModal}
                        clearDreams = {clearDreams}
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