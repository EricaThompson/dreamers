import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

import NavBar from './navbar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    isModalOpen: Boolean(state.ui.modal),
});

const mapDispatchToProps = dispatch => ({
    logout: logout,
    openModal: (type)=> dispatch(openModal(type))

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));