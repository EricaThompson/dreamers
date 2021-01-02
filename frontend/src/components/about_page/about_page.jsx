import React from 'react';

class AboutPage extends React.Component {


    render() {
        return (
            <div className='about-outer-container'>
                

                <div className="about-container">
                    <h1 className="about-title">About</h1>
                    <p className='team-member'>
                        “You are never too old to set another goal or to dream a new dream.” 
                        <br />
                        - C.S. Lewis
                        <br />
                        <br />
                        DREAMERS is an app that takes those once-transient nightly experiences and turns them into a new way to connect socially.
                        <br />
                        <br />
                        On one side, you will be able to log your daily dreams.
                        On the other side, you can log your daily, monthly or long term goals. 
                        
                        Our app lets you see who else in your network has similar dreams/goals and will be able to connect you to be able to dream up and build awesome things together.
                        </p>
                </div>
                <br />
                <div className="about-container">
                    <h1 className="about-title">Team Members:</h1>
                    <p className="team-member">Frontend Lead - <a target="_blank" rel="noreferrer" href="https://github.com/joshkohane">Josh Kohane</a></p>
                    <p className="team-member">Backend Lead - <a target="_blank" rel="noreferrer" href="https://github.com/AlanDai">Alan Dai</a></p>
                    <p className="team-member">Frontend/Backend Flex - <a target="_blank" rel="noreferrer" href="https://github.com/cindy803">Cindy Li</a></p>
                    <p className="team-member">Team Lead - <a target="_blank" rel="noreferrer" href="https://github.com/EricaThompson">Erica Thompson</a></p>
                </div>
                <br />
                <div className="about-container">
                    <h1 className="about-title">Credits</h1>
                    <p className="background-link">
                        <a href='https://www.fiverr.com/doomero' target="_blank" rel="noreferrer" className="background-link" >Logo created by Doomero</a>
                    </p>
                    <p className="background-link">
                        <a href='https://www.freepik.com/vectors/background' target="_blank" rel="noreferrer" className="background-link" >Background vector created by<br />starline - www.freepik.com</a>
                    </p>
                </div>
                
            </div>
        );
    }
}

export default AboutPage;