import React from 'react';
import { Link } from 'react-router-dom';

class AboutPage extends React.Component {


    render() {
        return (
            <div className="about-container">
                <h1 className="about-title">Team Members:</h1>
                <p className="team-member">Frontend Lead - <a href="https://github.com/joshkohane">Josh Kohane</a></p>
                <p className="team-member">Backend Lead - <a href="https://github.com/AlanDai">Alan Dai</a></p>
                <p className="team-member">Frontend/Backend Flex - <a href="https://github.com/cindy803">Cindy Li</a></p>
                <p className="team-member">Team Lead - <a href="https://github.com/EricaThompson">Erica Thompson</a></p>
            </div>
        );
    }
}

export default AboutPage;