import Profile from './profile';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchDreamsByUser, fetchDreams, createDream, clearDreams } from '../../actions/dream_actions';


const mapSTP = state => ({
    currentUser: state.session.user,
    dreams: state.dream,
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    createDream: (dream) => dispatch(createDream(dream)),
    fetchDreams: () => dispatch(fetchDreams()),
    fetchDreamsByUser: (userId) => dispatch(fetchDreamsByUser(userId)),
    clearDreams: () => dispatch(clearDreams()),
})

export default connect(mapSTP, mapDTP)(Profile);
