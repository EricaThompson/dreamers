import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../css/components/DREAMERS PNG-01 (2).png'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }

        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname 
            !== prevProps.location.pathname 
            && this.state.showDropdown) {
            this.setState({ showDropdown: false })
        } else if (this.props.isModalOpen 
            && this.state.showDropdown) {
            this.setState({ showDropdown: false })
        }
    }

    openModalAndPreventDefault(e){
        e.preventDefault()
        this.props.openModal('newDream')
    }
    

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    dropdownToggle() {
        this.setState({ showDropdown: !this.state.showDropdown })
    }

    render() {
        let dropdown;
        let menu;
        let { currentUser, isModalOpen } = this.props;

        if (this.props.loggedIn) {
            menu = <div
                onClick={() => this.dropdownToggle()}
                className='menu'>
                <i className="fas fa-bars"></i>
            </div>

            if (this.state.showDropdown) {
                dropdown = <div className="menu-items">
                    <Link to={`/new`}
                        onClick={(e)=>this.openModalAndPreventDefault(e)}
                    >
                        <p>create</p>
                    </Link>
                    <Link to={`/users/${currentUser.id}`}><p>profile</p></Link>
                    <Link to={`/about`}><p>about</p></Link>
                    <p className="logout" onClick={this.logoutUser} >logout</p>
                </div>
            }
        } else if (this.props.location.pathname !== "/") {
            menu = <div
                onClick={() => this.dropdownToggle()}
                className='menu'>
                <i className="fas fa-bars"></i>
            </div>

            if (this.state.showDropdown) {
                dropdown = <div className="menu-items">
                    <Link to={`/about`}><p>about</p></Link>
                    <Link 
                        to={'/login'}>
                            <p className="session-login-link">login</p>
                    </Link>
                    <Link 
                    to={'/signup'}>
                        <p className="session-signup-link">signup</p>
                    </Link>
                </div>
            }
        } else {
            menu = <div className="session-links">
                <Link to={`/about`}><p>about</p></Link>
                <Link to={'/login'}>
                    <p className="session-login-link">login</p>
                </Link>
                <Link to={'/signup'}>
                    <p className="session-signup-link">signup</p>
                </Link>
            </div>
        }

        return (
            <div className={isModalOpen ? "nav-bar nav-bar-modal" : "nav-bar"}>
                <div className="logo">
                    <Link to="/"
                        style={{ 
                            textDecoration: 'none' }} > 
                        <h1 className="nav-title">
                            {this.props.location.pathname === "/" 
                                ? "" 
                                : <img className='nav-logo' src={image} alt="Dreamers logo"/>
                            }
                        </h1>
                    </Link>
                </div>
                {menu}
                {dropdown}

            </div>
        );
    }
}

export default NavBar;