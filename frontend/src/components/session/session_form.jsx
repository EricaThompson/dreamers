import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginDemoUser = this.loginDemoUser.bind(this);
    }

    componentDidMount() {
        this.props.resetErrors();
    }
    
    componentDidUpdate(nextProps) {
        if (this.props.isSignedIn === true) {
            let user = {
                username: this.state.username,
                password: this.state.password,
                password2: this.state.password2
            };
            this.props.login(user);
        }
    }

    handleChange(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.action(user);
    }

    loginDemoUser(e) {
        e.preventDefault()
        this.props.login({
            username: 'bob',
            password: 'password'
        })
    }

    render() {
        let { errors, formType } = this.props;
        return (
            <div className="session-form-container" >
                <h1 className="session-form-title" >{formType === "signup" ? "Sign Up" : "Log In"}</h1>
                <form className="session-form" onSubmit={this.handleSubmit} >
                    <label className="session-form-label" >
                        <h2 className="session-form-header" >Username</h2>
                        <input className="session-form-input" 
                            type="text" 
                            value={this.state.username}
                            onChange={this.handleChange('username')} />
                            <div className="session-errors-container">
                                {errors.map(err => err.includes('User') ? <p className="session-errors" >{err}</p> : '')}
                            </div>
                    </label>
                    <label className="session-form-label" >
                        <h2 className="session-form-header" >Password</h2>
                        <input className="session-form-input" 
                            type="password" 
                            value={this.state.password}
                            onChange={this.handleChange('password')} />
                        <div className="session-errors-container">
                            {errors.map(err => err.includes('Password field is required') ? <p className="session-errors" >{err}</p> : '')}
                            {errors.map(err => err.includes('Password must be at least 6 characters') ? <p className="session-errors" >{err}</p> : '')}
                        </div>
                    </label>
                    {formType === "signup" ? 
                        <label className="session-form-label" >
                            <h2 className="session-form-header" >Confirm Password</h2>
                            <input className="session-form-input" 
                                type="password" 
                                value={this.state.password2}
                                onChange={this.handleChange('password2')} />
                            <div className="session-errors-container">
                                {errors.map(err => err.includes('Confirm Password field is required') ? <p className="session-errors" >{err}</p> : '')}
                                {errors.map(err => err.includes('Passwords must match') ? <p className="session-errors" >{err}</p> : '')}
                                {errors.map(err => err.includes('Incorrect password') ? <p className="session-errors" >{err}</p> : '')}
                            </div>
                        </label>
                    : ''}
                    <div className="session-form-submit-container" >
                        <input className="session-form-submit" type="submit" value={formType === "signup" ? "Sign Up" : "Log In"} />
                    </div>
                </form>
                <div className="session-form-demo-user-container" >
                    <button className="session-form-demo-user" onClick={this.loginDemoUser}>Sign In as Demo User</button>
                </div>
                <div className="session-switch" >
                    <p>{formType === "signup" ? "Already a user?" : "Not a user yet?"}</p>
                    <Link className="session-switch-link" style={{ textDecoration: 'none' }} to={formType === 'signup' ? `/login` : `/signup` } >{formType === "signup" ? "Log In Here" : "Sign Up Here"}</Link>
                </div>
            </div>
        )
    }
}

export default SessionForm;