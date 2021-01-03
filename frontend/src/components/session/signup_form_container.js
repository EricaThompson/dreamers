import SessionForm from './session_form';
import { connect } from 'react-redux';
import { signup, login, resetErrors } from '../../actions/session_actions';

const mapSTP = state => ({
    formType: 'signup',
    errors: Object.values(state.errors.session),
    isSignedIn: state.session.isSignedIn
})

const mapDTP = dispatch => ({
    login: user => dispatch(login(user)),
    action: user => dispatch(signup(user)),
    resetErrors: () => dispatch(resetErrors()),
})

export default connect(mapSTP, mapDTP)(SessionForm);
