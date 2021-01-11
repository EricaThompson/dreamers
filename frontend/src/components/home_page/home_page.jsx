import React from 'react';
// import "../../App.scss";
// import Feed from '../feed/feed';
import image from '../../css/components/DREAMERS-02.png'
import dreams from '../../css/components/DREAMS.png';
import goals from '../../css/components/GOALS.png';
import slogan from '../../css/components/SLOGAN.png';
import star from '../../css/components/STAR.png'

class HomePage extends React.Component {
    render() {
        return (
            <div className="logo" >
                <img className='star-image-1' src={star} alt="" />
                <img className='star-image-2' src={star} alt="" />
                <img className='star-image-3' src={star} alt="" />
                <img className='star-image-4' src={star} alt="" />
                <div className="splash-box-container">
                    <div className="splash-box">
                    
                        <img className='dreams-image' src={dreams} alt="" />
                    </div>
                    <div className="splash-box">
                    
                        <img className='goals-image' src={goals} alt="" />
                    </div>
                </div>                
                <img className='nav-logo' src={image} alt="" />
            </div>
        )
    }
}

export default HomePage;