import Feed from './feed';
import { connect } from 'react-redux';
import { openModal, closeModal, modalInfo } from '../../actions/modal_actions';
import { fetchDreams, clearDreams } from '../../actions/dream_actions';

const mapSTP = state => {
    // debugger;
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
})

export default connect(mapSTP, mapDTP)(Feed);