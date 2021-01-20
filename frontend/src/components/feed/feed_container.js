import Feed from './feed';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo } from '../../actions/modal_actions';
import { fetchCommentsByDream, clearComments } from '../../actions/comment_actions';
import { fetchDreams, clearDreams, deleteDream } from '../../actions/dream_actions';
import { fetchLike, createLike, deleteLike, fetchLikesByDream } from '../../actions/like_actions';
import { fetchSearchResults, clearSearch } from '../../actions/search_actions';
import { fetchFollowedUsersDreams } from '../../util/dream_api_util';
import { fetchUserById } from '../../actions/user_actions';

const mapSTP = state => ({
    currentUser: state.session.user,
    dreams: state.dream,
    like: state.like,
    searchResults: state.search,
    isModalOpen: state.ui.modal
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    modalInfo: (info) => dispatch(modalInfo(info)),
    fetchDreams: () => dispatch(fetchDreams()),
    clearDreams: () => dispatch(clearDreams()),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    clearComments: () => dispatch(clearComments()),
    deleteDream: (dreamId) => dispatch(deleteDream(dreamId)),
    fetchLike: (dreamId, like) => dispatch(fetchLike(dreamId, like)),
    createLike: (dreamId, like) => dispatch(createLike(dreamId, like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    fetchLikesByDream: (dreamId) => dispatch(fetchLikesByDream(dreamId)),
    fetchSearchResults: (searchParams) => dispatch(fetchSearchResults(searchParams)),
    clearSearch: () => dispatch(clearSearch()),
    fetchFollowedUsersDreams: fetchFollowedUsersDreams,
    fetchUserById: (userId) => dispatch(fetchUserById(userId)),
})

export default connect(mapSTP, mapDTP)(Feed);