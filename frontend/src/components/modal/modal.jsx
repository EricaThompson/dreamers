import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createDream } from '../../actions/dream_actions';
import { connect } from 'react-redux';
import NewDreamContainer from '../dreams/new_dream_container';
import CommentGoalModal from '../feed/comment_modal_goal';
import CommentDreamModal from '../feed/comment_modal_dream';

const Modal = ({ modal, closeModal, currentUser }) => {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'newDream':
            component = <NewDreamContainer currentUser={currentUser} createDream={createDream}/>;
            break;
        case 'commentGoal':
            component = <CommentGoalModal />;
            break;
        case 'commentDream':
            component = <CommentDreamModal />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal} >
            <div className="modal-child" onClick={e => e.stopPropagation()} >
                <span onClick={closeModal} className="close-modal-btn">&#x2715;</span>
                { component }
                {/* <NewDreamContainer /> */}
            </div>
        </div>
    )
}

const mapSTP = state => ({
    modal: state.ui.modal,
    currentUser: state.session.user
})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    createDream: (dream)=> dispatch(createDream(dream))
})

export default connect(mapSTP, mapDTP)(Modal);