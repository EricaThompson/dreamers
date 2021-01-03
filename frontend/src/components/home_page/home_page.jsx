import React from 'react';
// import "../../App.scss";
// import Feed from '../feed/feed';
import image from '../../css/components/DREAMERS-02.png'


class HomePage extends React.Component {

    // componentDidMount(){
    //     this.props.fetchDreams()
    // }

    render() {
        // console.log('homepage props', this.props)
        return (
            <div className="logo" >
                {/* <i class="fas fa-cloud logo-icon"></i> */}
                {/* <h1 className="logo-title">DREAMERS</h1> */}
                
                <img className='nav-logo' src={image} alt="" />
                {/* <div className="box"></div> */}
                {/* <Feed
                    fetchDreams={this.props.fetchDreams}
                    currentUser={this.props.currentUser}
                    dreams={this.props.dreams}
                /> */}
            </div>
        )
    }
}

export default HomePage;