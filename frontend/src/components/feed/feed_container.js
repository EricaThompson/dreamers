import Feed from './feed';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo } from '../../actions/modal_actions';
import { fetchCommentsByDream, clearComments } from '../../actions/comment_actions';
import { fetchDreams, clearDreams, deleteDream } from '../../actions/dream_actions';

const mapSTP = state => {
    return {
    currentUser: state.session.user,
    dreams: state.dream,
}}

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    modalInfo: (info) => dispatch(modalInfo(info)),
    fetchDreams: () => dispatch(fetchDreams()),
    clearDreams: () => dispatch(clearDreams()),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    clearComments: () => dispatch(clearComments()),
    deleteDream: (dreamId) => dispatch(deleteDream(dreamId))
})

export default connect(mapSTP, mapDTP)(Feed);