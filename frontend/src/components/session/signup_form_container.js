import SessionForm from './session_form';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';

const mapSTP = state => ({
    formType: 'signup',
    errors: Object.values(state.errors.session),
})

const mapDTP = dispatch => ({
    login: () => dispatch(() => { }),
    action: user => dispatch(signup(user)),
})

export default connect(mapSTP, mapDTP)(SessionForm);
