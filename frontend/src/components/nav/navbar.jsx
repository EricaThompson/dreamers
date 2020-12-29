import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    dropdownToggle(){
        this.setState({showDropdown: !this.state.showDropdown})
    }

    render() {
        let dropdown;
        let menu;

        if (this.props.loggedIn){
            menu = <div
                onClick={() => this.dropdownToggle()}
                className='menu'>
                <i className="fas fa-bars"></i>
            </div>

            if (this.state.showDropdown) {
                dropdown = <div className="menu-items">
                                {/* <Link to={'/signup'}><p>signup</p></Link>
                                <Link to={'/login'}><p>login</p></Link> */}
                                <Link to={"/user/5fea402f69e4673c9345018b"}><p>profile</p></Link>
                                <Link to={`/about`}><p>about</p></Link>
                                <p className="logout" onClick={this.logoutUser} >logout</p>
                            </div>
            }
        } else {
            menu = <div className="session-links">
                        <Link to={`/about`}><p>about</p></Link>
                        <Link to={'/login'}><p className="session-login-link">login</p></Link>
                        <Link to={'/signup'}><p className="session-signup-link">signup</p></Link>  
                    </div>
        }

        return (
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }} > <h1 className="nav-title">DREAMERS</h1></Link>
                </div>
                {menu}
                {dropdown}

            </div>
        );
    }
}

export default NavBar;