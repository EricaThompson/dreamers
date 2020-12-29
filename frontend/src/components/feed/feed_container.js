import Feed from './feed';
import { connect } from 'react-redux';

const mapSTP = state => ({
    currentUser: state.session.user,
})

const mapDTP = dispatch => ({

})

export default connect(mapSTP, mapDTP)(Feed);