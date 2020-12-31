import DreamShow from './dream_show';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

const mapSTP = state => ({
    currentUser: state.session.user,
})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(mapSTP, mapDTP)(DreamShow);