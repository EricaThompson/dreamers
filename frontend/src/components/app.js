import React from 'react';
import NavBar from './nav/nav_bar';
import HomePage from './home_page';
import "../App.scss";

const App = () => (
    <div className="app-container">
        <div className="nav-bar">
            <NavBar />
        </div>
        <div className="main-app" >
            <HomePage />
        </div>
    </div>
);

export default App;