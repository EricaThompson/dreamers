import SessionForm from './session_form';
import { login } from '../../actions/session_actions';
import { connect } from 'react-redux';

const mapSTP = state => ({
    formType: 'login',
    errors: state.errors.session
})

const mapDTP = dispatch => ({
    login: user => dispatch(login(user)),
    action: user => dispatch(login(user)),
})

export default connect(mapSTP, mapDTP)(SessionForm);
