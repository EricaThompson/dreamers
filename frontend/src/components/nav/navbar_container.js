import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

import NavBar from './navbar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    isModalOpen: Boolean(state.ui.modal),
});

export default withRouter(connect(
    mapStateToProps,
    { logout }
)(NavBar));