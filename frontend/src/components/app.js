import React from 'react';
import NavBarContainer from './nav/navbar_container';
import HomePage from './home_page/home_page';
import "../App.scss";
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Modal from './modal/modal';
import Feed from './feed/feed';
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
                <AuthRoute exact path="/" component={HomePage} />

                <ProtectedRoute path={`/feed`} component={Feed} />
                <ProtectedRoute path={`/profile`} component={ProfileContainer} />
                <Redirect to="/" />
            </Switch>
        </div>
    </div>
);

export default App;