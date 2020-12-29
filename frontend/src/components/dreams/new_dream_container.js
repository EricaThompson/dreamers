import NewDream from './new_dream';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

const mapSTP = state => ({

})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(mapSTP, mapDTP)(NewDream);
