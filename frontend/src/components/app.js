import React from 'react';
import NavBarContainer from './nav/navbar_container';
import HomePage from './home_page/home_page';
import AboutPage from './about_page/about_page';
import "../App.scss";
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Modal from './modal/modal';
import FeedContainer from './feed/feed_container';
import ProfileContainer from './profile/profile_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';


const App = () => (
    <div className="app-container">
        <div className="nav-bar">
            <NavBarContainer />
        </div>    
        <div className="main-app" >
            <Modal />
            <Switch>
                <AuthRoute path={`/login`} component={LoginFormContainer} />
                <AuthRoute path={`/signup`} component={SignupFormContainer} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <ProtectedRoute path={`/feed`} component={FeedContainer} />
                <ProtectedRoute path={`/users/:userId`} component={ProfileContainer} />
                <Redirect to="/" />
            </Switch>
        </div>
    </div>
);

export default App;