import React from 'react';
// import "../../App.scss";
// import Feed from '../feed/feed';
import image from '../../css/components/DREAMERS-02.png'
import dreams from '../../css/components/DREAMS.png';
import goals from '../../css/components/GOALS.png';
import slogan from '../../css/components/SLOGAN.png';
import star from '../../css/components/STAR.png'

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

                <img className='star-image-1' src={star} alt="" />
                <img className='star-image-2' src={star} alt="" />
                <img className='star-image-3' src={star} alt="" />
                <img className='star-image-4' src={star} alt="" />
                <div className="splash-box">
                
                    <img className='dreams-image' src={dreams} alt="" />
                </div>
                <div className="splash-box">
                
                    <img className='goals-image' src={goals} alt="" />
                </div>

                <img className='slogan-image' src={slogan} alt="" />

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