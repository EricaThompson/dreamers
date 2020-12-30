import React from 'react';

class AboutPage extends React.Component {


    render() {
        return (
            <div className="about-container">
                <h1 className="about-title">Team Members:</h1>
                <p className="team-member">Frontend Lead - <a target="_blank" rel="noreferrer" href="https://github.com/joshkohane">Josh Kohane</a></p>
                <p className="team-member">Backend Lead - <a target="_blank" rel="noreferrer" href="https://github.com/AlanDai">Alan Dai</a></p>
                <p className="team-member">Frontend/Backend Flex - <a target="_blank" rel="noreferrer" href="https://github.com/cindy803">Cindy Li</a></p>
                <p className="team-member">Team Lead - <a target="_blank" rel="noreferrer" href="https://github.com/EricaThompson">Erica Thompson</a></p>
                <p className="background-link">
                    <a href='https://www.freepik.com/vectors/background' target="_blank" rel="noreferrer" className="background-link" >Background vector created by<br />starline - www.freepik.com</a>
                </p>
            </div>
        );
    }
}

export default AboutPage;