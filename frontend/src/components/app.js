import React from 'react';
import HomePage from './home_page/home_page';
import "../App.scss";
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
    <div className="main-app" >
        <Switch>
            <Route path={`/api/login`} component={LoginFormContainer} />
            <Route path={`/api/signup`} component={SignupFormContainer} />
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
        </Switch>
    </div>
);

export default App;