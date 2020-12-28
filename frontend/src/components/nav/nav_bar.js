import React from 'react';
import { Link } from 'react-router-dom';
// import '../../css/components/nav_bar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        // this.logoutUser = this.logoutUser.bind(this);
        // this.getLinks = this.getLinks.bind(this);
    }

    // logoutUser(e) {
    //     e.preventDefault();
    //     this.props.logout();
    // }

    // getLinks() {
    //     if (this.props.loggedIn) {
    //         return (
    //             <div
    //                 className="navbar"
    //             >
    //                 {/* <Link to={'/tweets'}><p><i className="fab fa-earlybirds"></i></p></Link>
    //                 <Link to={'/tweets'}><p><i className="fas fa-igloo"></i></p></Link>
    //                 <p><i className="fas fa-search disabled"></i></p>
    //                 <p><i className="far fa-bell disabled"></i></p>
    //                 <p><i className="far fa-envelope disabled"></i></p>
    //                 <p><i className="far fa-bookmark disabled"></i></p>
    //                 <p><i className="fas fa-stream disabled"></i></p>
    //                 <Link to={'/profile'}><p><i className="far fa-user"></i></p></Link>
    //                 <p><i className="fas fa-ellipsis-h disabled"></i></p>
    //                 <Link to={'/new_tweet'}><p><i className="fas fa-feather"></i></p></Link> */}
    //                 <i className="fas fa-bars"></i>
    //                 {/* <button
    //                     onClick={this.logoutUser}
    //                     className="logout"
    //                 >
    //                 </button> */}
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="top-links">
    //                 <Link to={'/signup'}><p>Signup</p></Link>
    //                 <Link to={'/login'}><p>Login</p></Link>
    //             </div>
    //         );
    //     }
    // }

    render() {
        return (
            <div className="nav-bar">
                {/* { this.getLinks()} */}
                <div className="logo">
                    <h1 className="logo-title">DREAMERS</h1>
                </div>
                <div className='menu'>
                    <i className="fas fa-bars"></i>
                </div>

            </div>
        );
    }
}

export default NavBar;