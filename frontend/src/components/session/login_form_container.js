import SessionForm from './session_form';
import { login, resetErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';

const mapSTP = state => ({
    formType: 'login',
    errors: Object.values(state.errors.session),
})

const mapDTP = dispatch => ({
    login: user => dispatch(login(user)),
    action: user => dispatch(login(user)),
    resetErrors: () => dispatch(resetErrors()),
})

export default connect(mapSTP, mapDTP)(SessionForm);
