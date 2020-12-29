import Profile from './profile';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapSTP = state => ({

})

const mapDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
})

export default connect(mapSTP, mapDTP)(Profile);
