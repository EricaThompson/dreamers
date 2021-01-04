import TagsFeed from './tags';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo } from '../../actions/modal_actions';
import { fetchDreamsByTags, clearDreams } from '../../actions/dream_actions';
import { fetchCommentsByDream, clearComments } from '../../actions/comment_actions';
import { fetchSearchResults, clearSearch } from '../../actions/search_actions';
import { fetchLike, createLike, deleteLike, fetchLikesByDream } from '../../actions/like_actions';

const mapSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    dreams: state.dream,
    tagName: ownProps.match.params.tag,
    searchResults: state.search,
    isModalOpen: state.ui.modal
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    fetchDreamsByTags: (tags) => dispatch(fetchDreamsByTags(tags)),
    modalInfo: (info) => dispatch(modalInfo(info)),
    clearDreams: () => dispatch(clearDreams()),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    clearComments: () => dispatch(clearComments()),
    fetchSearchResults: (searchParams) => dispatch(fetchSearchResults(searchParams)),
    clearSearch: () => dispatch(clearSearch()),
    fetchLike: (dreamId, like) => dispatch(fetchLike(dreamId, like)),
    createLike: (dreamId, like) => dispatch(createLike(dreamId, like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    fetchLikesByDream: (dreamId) => dispatch(fetchLikesByDream(dreamId)),
})

export default connect(mapSTP, mapDTP)(TagsFeed);