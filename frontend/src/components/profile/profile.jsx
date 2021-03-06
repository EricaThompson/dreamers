import React from 'react';
import { withRouter, Link } from 'react-router-dom';
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
            likes: [],
            numLikes: null,
            propLikes: null,
            followers: [],
            myFollowers: [],
            popout: false
        }
        this.handlePopOut = this.handlePopOut.bind(this);
    }

    componentDidMount() {
        this.props.closeModal();
        this.props.clearSearch();
        this.props.clearModalInfo();
        this.props.fetchUserById(this.props.match.params.userId)
        .then(res => this.setState({ 
            profileUser: res.user, 
            timestamp: res.user._id.toString().substring(0, 8),
            username: res.user.username,
            age: res.user.age,
            location: res.user.location,
            bio: res.user.bio
        }))

        this.props.fetchDreamsByUser(this.props.match.params.userId)
        this.props.fetchFollowers(this.props.match.params.userId)
            .then(payload => this.setState({followers: payload.data}));
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

    handlePopOut() {
        this.props.fetchUsersByUserIds({userIds: this.state.followers})
            .then(payload => this.setState({ 
                myFollowers: payload.data, 
                popout: !this.state.popout 
            }));
    }

    handleChange(value) {
        return e => {
            this.setState({ [value]: e.currentTarget.value })
        }
    }

    handleSubmit(){
        let user = {
            age: this.state.age.slice(0, 3),
            location: this.state.location.slice(0, 20),
            bio: this.state.bio.slice(0, 30),
        }
        this.props.updateUser(this.state.currentUserId, user)

        //! change this
        window.location.reload()
    }

    handleSelected(type) {
        return () => {
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
            if(this.state.followers.includes(this.props.currentUser.id)) {
                followBtn = <button
                        className="new-dream-btn"
                        onClick={() => {
                            this.props.unfollowUser(
                                this.props.match.params.userId)
                            let i = this.state.followers
                                .indexOf(this.props.match.params.userId);
                            this.state.followers.splice(i, 1);
                            this.setState({ followers: this.state.followers });
                        }} 
                    >
                        Unfollow
                    </button>
            } else {
                followBtn = <button
                        className="new-dream-btn"
                        onClick={() => { 
                            this.props.followUser(this.props.match.params.userId)
                            this.state.followers.push(this.props.currentUser.id);
                            this.setState({ followers: this.state.followers });
                        }}
                    >
                        Follow
                    </button>
            }
        }

        let { 
            openModal, 
            dreams, 
            clearDreams, 
            clearComments, 
            fetchCommentsByDream, 
            modalInfo, 
            currentUser, 
            closeModal, 
            deleteDream, 
            fetchLike, 
            createLike, 
            deleteLike, 
            fetchLikesByDream 
        } = this.props;
        if (!dreams) return null;

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
        let popout;

        if (this.state.myFollowers.length > 0) {
            popout = <div className="likes-popout-inner-container">
                <span 
                    onClick={this.handlePopOut} 
                    className="close-popout-btn">
                        &#x2715;
                </span>
                {this.state.myFollowers.map((follower, idx) => {
                    return <Link 
                                key={idx} 
                                to={`/users/${follower._id}`} 
                                style={{ textDecoration: 'none' }}
                            >
                        <div className="popout-item" >{follower.username}</div>
                    </Link>
                })}
            </div>
        } else {
            popout = <div className="likes-popout-inner-container" >
                <span 
                    onClick={this.handlePopOut} 
                    className="close-popout-btn">
                        &#x2715;
                </span>
                <p className="popout-item-none" >Be the first to follow!</p>
            </div>
        }

        if (this.state.showEditForm) {
            editForm = <div className="edit-profile-form">
                            <div className="username inner-profile-item">
                                {this.state.profileUser.username}
                            </div>
                            <div className='inner-profile-item'>
                                Dreamer Since: {month} {date.getDate()}, {date.getFullYear()}
                            </div>
                            <div 
                                className="location inner-profile-item"> 
                                Location: 
                                <input 
                                    onChange={this.handleChange('location')}
                                    value={this.state.location} 
                                />
                            </div>
                            <div 
                                className="age inner-profile-item">
                                Age: 
                                <input
                                    onChange={this.handleChange('age')}
                                    value={this.state.age}
                                    /> 
                            </div>
                            <div 
                                className="about inner-profile-item">
                                Bio: 
                                <input
                                    onChange={this.handleChange('bio')}
                                    value={this.state.bio} 
                                />
                            </div>
                                <button 
                                    className="inner-profile-item"
                                    onClick={() => this.handleSubmit()}>
                                        update
                                </button>
                            </div>
        } else {
            profile = <div className='inner-profile'>
                        <div 
                            className="username inner-profile-item"
                        >
                            {this.state.profileUser.username}
                        </div>
                        <div className='inner-profile-item'>
                            Dreamer Since: {
                                month} {
                                date.getDate()}, {
                                date.getFullYear()
                            }
                        </div>
                        <div className='inner-profile-item'>
                            Location: {this.state.profileUser.location}
                        </div>
                        <div className="age inner-profile-item">
                            Age: {this.state.profileUser.age}
                        </div>
                        <div className="about inner-profile-item">
                            Bio: {this.state.profileUser.bio}
                        </div>
                        <div 
                            className="followers inner-profile-item" 
                            onClick={this.handlePopOut}
                        >
                            Followers: {this.state.followers.length}
                        </div>
                        {this.state.popout 
                            ? <div 
                                    className="follower-popout-container" 
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    {popout}
                                </div>
                            : ''}
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
                        fetchLike={fetchLike}
                        createLike={createLike}
                        deleteLike={deleteLike}
                        fetchLikesByDream={fetchLikesByDream}
                        dream={dreams}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);