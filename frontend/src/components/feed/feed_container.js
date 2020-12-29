import Feed from './feed';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapSTP = state => ({
    currentUser: state.session.user,
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
})

export default connect(mapSTP, mapDTP)(Feed);