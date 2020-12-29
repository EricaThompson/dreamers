import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { openModal } = this.props;
        debugger;
        return (
            <div>
                <button className="new-dream-btn" onClick={() => openModal('newDream')} >Create new dream</button>
            </div>
        )
    }
}

export default Profile;