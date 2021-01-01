import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createDream, updateDream } from '../../actions/dream_actions';
import { connect } from 'react-redux';
import NewDreamContainer from '../dreams/new_dream_container';
import CommentGoalModal from '../feed/comment_modal_goal';
import CommentDreamModal from '../feed/comment_modal_dream';
import { fetchCommentsByDream, createComment } from '../../actions/comment_actions';

const Modal = ({ modal, currentUser, closeModal, info, fetchCommentsByDream, comments, createComment }) => {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'newDream':
            component = <NewDreamContainer 
                currentUser={currentUser} 
                createDream={createDream}
                updateDream={updateDream}
                info={info}
            />;
            break;
        case 'commentGoal':
            component = <CommentGoalModal info={info} fetchCommentsByDream={fetchCommentsByDream} comments={comments} createComment={createComment} />;
            break;
        case 'commentDream':
            component = <CommentDreamModal info={info} fetchCommentsByDream={fetchCommentsByDream} comments={comments} createComment={createComment}  />;
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

const mapSTP = state => {
    // debugger;
    return {
    modal: state.ui.modal,
    currentUser: state.session.user,
    info: state.modalInfo,
    comments: state.comment
}}

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    createDream: (dream)=> dispatch(createDream(dream)),
    updateDream: (dreamId, dream) => dispatch(updateDream(dreamId, dream)),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    createComment: (dreamId, comment) => dispatch(createComment(dreamId, comment))
})

export default connect(mapSTP, mapDTP)(Modal);