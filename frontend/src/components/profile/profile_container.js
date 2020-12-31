import Profile from './profile';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo } from '../../actions/modal_actions';
import { fetchDreamsByUser, fetchDreams, createDream, clearDreams } from '../../actions/dream_actions';
import { fetchUserById, updateUser } from '../../actions/user_actions';


const mapSTP = state => ({
    currentUser: state.session.user,
    dreams: state.dream,
    user: state.user
})

const mapDTP = dispatch => ({
    fetchUserById: (userId) => dispatch(fetchUserById(userId)),
    updateUser: (user) => dispatch(updateUser(user)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    modalInfo: (info) => dispatch(modalInfo(info)),
    createDream: (dream) => dispatch(createDream(dream)),
    fetchDreams: () => dispatch(fetchDreams()),
    fetchDreamsByUser: (userId) => dispatch(fetchDreamsByUser(userId)),
    clearDreams: () => dispatch(clearDreams()),
})

export default connect(mapSTP, mapDTP)(Profile);
