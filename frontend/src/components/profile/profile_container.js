import Profile from './profile';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo, clearModalInfo } from '../../actions/modal_actions';
import { fetchDreamsByUser, fetchDreams, createDream, clearDreams, deleteDream } from '../../actions/dream_actions';
import { fetchUserById, updateUser } from '../../actions/user_actions';
import { fetchCommentsByDream, clearComments } from '../../actions/comment_actions';

const mapSTP = state => ({
    currentUser: state.session.user,
    dreams: state.dream,
    user: state.user
})

const mapDTP = dispatch => ({
    fetchUserById: (userId) => dispatch(fetchUserById(userId)),
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    createDream: (dream) => dispatch(createDream(dream)),
    fetchDreams: () => dispatch(fetchDreams()),
    fetchDreamsByUser: (userId) => dispatch(fetchDreamsByUser(userId)),
    clearDreams: () => dispatch(clearDreams()),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    clearComments: () => dispatch(clearComments()),
    modalInfo: (info) => dispatch(modalInfo(info)),
    clearModalInfo: () => dispatch(clearModalInfo()),
    deleteDream: (dreamId) => dispatch(deleteDream(dreamId))
})

export default connect(mapSTP, mapDTP)(Profile);
