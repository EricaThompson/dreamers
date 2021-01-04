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
            currentUserId: this.props.currentUser.id,
            profileUser: this.props.user,
            showEditForm: false,
            username: null,
            age: null,
            bio: null,
            location: null,
            timestamp: null,
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSelected = this.handleSelected.bind(this);
    }

    componentDidMount() {
        this.props.closeModal();
        this.props.clearSearch();
        this.props.clearModalInfo();
        this.props.fetchDreamsByUser(this.props.match.params.userId)
        this.props.fetchUserById(this.props.match.params.userId)
            .then(res => this.setState({ 
                profileUser: res.user, 
                timestamp: res.user._id.toString().substring(0, 8),
                username: res.user.username,
                age: res.user.age,
                location: res.user.location,
                bio: res.user.bio
            }))
            // .then(res => this.setState({ }))
            // .then(res => console.log(res))
        // this.props.fetchDreams()
            // .then(res => this.setState({userDreams: Object.values(res).data}))
        // debugger
        // console.log('props dreams',this.props.dreams)
        // console.log('state dreams', this.state.userDreams)
            // .then(res => this.setState({userDreams: res}))
    }

    componentDidUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            window.location.reload();
        }
    }

    componentWillUnmount() {
        this.props.clearDreams();
        this.props.clearModalInfo();
    }

    handleChange(value) {
        return e => {
            this.setState({ [value]: e.currentTarget.value })
        }
    }

    handleSubmit(){
        // debugger
        let user = {
            age: this.state.age,
            location: this.state.location,
            bio: this.state.bio,
        }
        this.props.updateUser(this.state.currentUserId, user)

        //! change this
        window.location.reload()
    }

    handleSelected(type) {
        return (e) => {
            this.setState({ selected: type })
        }
    }

    toggleEditForm(){
        this.setState({showEditForm: !this.state.showEditForm})
    }

    render() {
        let editBtn;
        let newDreamBtn;
        let followBtn;

        if (this.props.match.params.userId === this.state.currentUser.id){
            editBtn = <button 
                        onClick={()=>this.toggleEditForm()}
                        className="profile-edit-button">
                            Edit Profile
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

        let { openModal, dreams, clearDreams, clearComments, fetchCommentsByDream, modalInfo, currentUser, closeModal, deleteDream } = this.props;
        if (!dreams) return null;
        // console.log('user', this.props.user._id.toString().substring(0, 8))
        // console.log(this.state.timestamp.getMonth())

        //!fix user grab
        // let timestamp = this.state.profileUser._id.toString().substring(0, 8)
        let date = new Date(parseInt(this.state.timestamp, 16) * 1000)
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

        let profile;
        let editForm;

        if (this.state.showEditForm) {
            editForm = <div className="edit-profile-form">
                            
                            <div className="username">{this.state.profileUser.username}</div>
                            <div>Dreamer Since: {month} {date.getDate()} {date.getFullYear()}</div>
                            <div 
                                className="location"> 
                                Location: 
                                <input 
                                    onChange={this.handleChange('location')}
                                    value={this.state.location} 
                                />
                            </div>
                            <div 
                                className="age">
                                Age: 
                                <input
                                    onChange={this.handleChange('age')}
                                    value={this.state.age}
                                    /> 
                            </div>
                            <div 
                                className="bio">
                                Bio: 
                                <input
                                    onChange={this.handleChange('bio')}
                                    value={this.state.bio} 
                                />
                            </div>
                                <button onClick={() => this.handleSubmit()}>update</button>
                            </div>
        } else {
            profile = <div>
                <div className="username">{this.state.profileUser.username}</div>
                <div>Dreamer Since: {month} {date.getDate()}, {date.getFullYear()}</div>
                <div>Location: {this.state.profileUser.location}</div>
                <div className="age">Age: {this.state.profileUser.age}</div>
                <div className="about">
                    Bio: {this.state.profileUser.bio}
                </div>
            </div>

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
                        {editForm}
                        {profile}
                        
                        {/* <div>Followers: {this.state.thisUser.followers.length}</div> */}
                        {followBtn}
                    </div>
                </div>
                <div className="profile-dream-feed">
                    <Feed 
                        currentUser={currentUser}
                        userId={this.props.match.params.userId}
                        dreams={dreams}
                        openModal = {openModal}
                        clearDreams = {clearDreams}
                        fetchDreamsByUser = {this.props.fetchDreamsByUser}
                        clearComments={clearComments}
                        fetchCommentsByDream={fetchCommentsByDream}
                        modalInfo={modalInfo}
                        closeModal={closeModal}
                        deleteDream={deleteDream}
                        searchResults={this.props.searchResults}
                        fetchSearchResults={this.props.fetchSearchResults}
                        clearSearch={this.props.clearSearch}
                        isModalOpen={this.props.isModalOpen}
                    />
                </div>
                
            </div>
        )
    }
}

export default withRouter(Profile);