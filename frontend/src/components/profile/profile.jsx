import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { openModal } = this.props;
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
                        <div className="age">100</div>
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
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    <div>Dream</div>
                    {/* <div>Dream</div>
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

export default Profile;