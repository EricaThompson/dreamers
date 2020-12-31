import DreamShow from './dream_show';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { fetchDreamById } from '../../actions/dream_actions';
const mapSTP = state => ({
    currentUser: state.session.user,
    dream: Object.values(state.dream)[0],
})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    fetchDreamById: (dreamId) => dispatch(fetchDreamById(dreamId))
})

export default connect(mapSTP, mapDTP)(DreamShow);