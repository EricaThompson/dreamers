import TagsFeed from './tags';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchDreamsByTags } from '../../actions/dream_actions';

const mapSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    dreams: Object.values(state.dream)[0],
    tagName: ownProps.match.params.tag,
})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    fetchDreamsByTags: (tags) => dispatch(fetchDreamsByTags(tags)),
})

export default connect(mapSTP, mapDTP)(TagsFeed);