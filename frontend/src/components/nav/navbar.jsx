import React from 'react';
import { Link } from 'react-router-dom';
// import '../../css/components/nav_bar.scss';

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
        if (this.state.showDropdown){
            dropdown = <div className="menu-items">
                <Link to={'/signup'}><p>signup</p></Link>
                <Link to={'/login'}><p>login</p></Link>
                <p className="logout" onClick={this.logoutUser} >logout</p>
            </div>
        }

        return (
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }} > <h1 className="nav-title">DREAMERS</h1></Link>
                </div>
                {dropdown}
                <div
                    onClick={()=>this.dropdownToggle()}
                    className='menu'>
                        <i className="fas fa-bars"></i>
                </div>

            </div>
        );
    }
}

export default NavBar;