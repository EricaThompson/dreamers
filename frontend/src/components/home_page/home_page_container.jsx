import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchDreamsByUser, fetchDreams, createDream } from '../../actions/dream_actions';
import HomePage from './home_page';


const mapSTP = state => ({
    currentUser: state.session.user,
    dreams: Object.values(state.dream)[0],
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    createDream: (dream) => dispatch(createDream(dream)),
    fetchDreams: () => dispatch(fetchDreams()),
    fetchDreamsByUser: (userId) => dispatch(fetchDreamsByUser(userId)),
})

export default connect(mapSTP, mapDTP)(HomePage);