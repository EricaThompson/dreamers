import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NewDreamContainer from '../dreams/new_dream_container';
import CommentModal from '../feed/comment_modal';

const Modal = ({ modal, closeModal }) => {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'newDream':
            component = <NewDreamContainer />;
            break;
        case 'comment':
            component = <CommentModal />;
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
})

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(mapSTP, mapDTP)(Modal);