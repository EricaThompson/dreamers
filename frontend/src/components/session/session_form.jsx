import React from 'react';
import { Link } from 'react-router-dom';

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
                            <div className="session-errors-container">
                                {/* {errors.map(err => err.includes('Username') ? <p className="session-errors" >{err}</p> : '')} */}
                            </div>
                    </label>
                    <label className="session-form-label" >
                        <h2 className="session-form-header" >Password</h2>
                        <input className="session-form-input" 
                            type="password" 
                            value={this.state.password}
                            onChange={this.handleChange('password')} />
                        <div className="session-errors-container">
                            {/* {errors.map(err => err.includes('Password field is required') ? <p className="session-errors" >{err}</p> : '')} */}
                            {/* {errors.map(err => err.includes('Password must be at least 6 characters') ? <p className="session-errors" >{err}</p> : '')} */}
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
                                {/* {errors.map(err => err.includes('Confirm Password field is required') ? <p className="session-errors" >{err}</p> : '')} */}
                                {/* {errors.map(err => err.includes('Passwords must match') ? <p className="session-errors" >{err}</p> : '')} */}
                            </div>
                        </label>
                    : ''}
                    <div className="session-form-submit-container" >
                        <input className="session-form-submit" type="submit" value={formType === "signup" ? "Sign Up" : "Log In"} />
                    </div>
                </form>
                <div className="session-switch" >
                    <p>{formType === "signup" ? "Already a user?" : "Not a user yet?"}</p>
                    <Link className="session-switch-link" style={{ textDecoration: 'none' }} to={formType === 'signup' ? `/api/login` : `/api/signup` } >{formType === "signup" ? "Log In Here" : "Sign Up Here"}</Link>
                </div>
            </div>
        )
    }
}

export default SessionForm;