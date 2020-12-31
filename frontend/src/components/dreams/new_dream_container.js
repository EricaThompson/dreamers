import NewDream from './new_dream';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
// import { createDream } from '../../util/dream_api_util';

const mapSTP = state => ({
    currentUser: state.session.user,
})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    // createDream: (dream) => dispatch(createDream(dream)),
})

export default connect(mapSTP, mapDTP)(NewDream);
