import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
        }
    }
    render() {
        let { formType } = this.props;
        return (
            <div className="session-form-container" >
                <h1>{formType === "signup" ? "Sign Up" : "Log In"}</h1>
                <form>
                    <label>
                        <h2>Username</h2>
                        <input type="text" value={this.state.username} />
                    </label>
                    <label>
                        <h2>Password</h2>
                        <input type="password" value={this.state.password} />
                    </label>
                    {formType === "signup" ? 
                        <label>
                            <h2>Confirm Password</h2>
                            <input type="password" value={this.state.password2} />
                        </label>
                    : ''}
                    <input type="submit" value={formType === "signup" ? "Sign Up" : "Log In"} />
                </form>
            </div>
        )
    }
}

export default SessionForm;