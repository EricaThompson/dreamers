import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }


    render() {
        let { formType } = this.props;
        return (
            <div className="session-form-container" >
                <h1 className="session-form-title" >{formType === "signup" ? "Sign Up" : "Log In"}</h1>
                <form className="session-form" >
                    <label className="session-form-label" >
                        <h2 className="session-form-header" >Username</h2>
                        <input className="session-form-input" 
                            type="text" 
                            value={this.state.username}
                            onChange={this.handleChange('username')} />
                    </label>
                    <label className="session-form-label" >
                        <h2 className="session-form-header" >Password</h2>
                        <input className="session-form-input" 
                            type="password" 
                            value={this.state.password}
                            onChange={this.handleChange('password')} />
                    </label>
                    {formType === "signup" ? 
                        <label className="session-form-label" >
                            <h2 className="session-form-header" >Confirm Password</h2>
                            <input className="session-form-input" 
                                type="password" 
                                value={this.state.password2}
                                onChange={this.handleChange('password2')} />
                        </label>
                    : ''}
                    <input className="session-form-submit" type="submit" value={formType === "signup" ? "Sign Up" : "Log In"} />
                </form>
            </div>
        )
    }
}

export default SessionForm;