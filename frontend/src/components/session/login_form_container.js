import SessionForm from './session_form';
import { connect } from 'react-redux';

const mapSTP = state => ({
    formType: 'login',
})

const mapDTP = dispatch => ({
    login: () => dispatch(() => {}),
    action: () => dispatch(() => { }),
})

export default connect(mapSTP, mapDTP)(SessionForm);