import Feed from './feed';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchDreams } from '../../actions/dream_actions';

const mapSTP = state => {
    // debugger;
    return {
    currentUser: state.session.user,
    dreams: Object.values(state.dream)[0],
}}

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    fetchDreams: () => dispatch(fetchDreams()),
})

export default connect(mapSTP, mapDTP)(Feed);