import React from 'react';
import NavBar from './nav/nav_bar';
import HomePage from './home_page/home_page';
import "../App.scss";
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <div className="app-container">
        <div className="nav-bar">
            <NavBar />
        </div>    
        <div className="main-app" >
            <Switch>
                <AuthRoute path={`/login`} component={LoginFormContainer} />
                <AuthRoute path={`/signup`} component={SignupFormContainer} />
                <Route exact path="/" component={HomePage} />
                <Redirect to="/" />
            </Switch>
        </div>
    </div>
);

export default App;