import React from 'react';
import { closeModal, clearModalInfo } from '../../actions/modal_actions';
import { createDream, updateDream } from '../../actions/dream_actions';
import { connect } from 'react-redux';
import NewDreamContainer from '../dreams/new_dream_container';
// import CommentGoalModal from '../feed/comment_goal_modal';
import CommentDreamModal from '../feed/comment_dream_modal';
import { fetchCommentsByDream, createComment, deleteComment } from '../../actions/comment_actions';
import { updateComment } from '../../actions/comment_actions';
import { resetErrors } from '../../actions/session_actions';
import { fetchSearchResults, clearSearch } from '../../actions/search_actions';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal(e) {
        this.props.closeModal();
        this.props.clearModalInfo();
        this.props.clearSearch();
    }

    render() {
        let { modal, currentUser, info, fetchCommentsByDream, comments, createComment, clearModalInfo, updateComment, errors, clearSearch, fetchSearchResults, searchResults } = this.props;
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
                    resetErrors={resetErrors}
                    errors={errors}
                    clearSearch={clearSearch}
                    fetchSearchResults={fetchSearchResults}
                    searchResults={searchResults}
                />;
                break;
            // case 'commentGoal':
            //     component = <CommentGoalModal
            //         info={info}
            //         fetchCommentsByDream={fetchCommentsByDream}
            //         comments={comments}
            //         createComment={createComment}
            //         clearModalInfo={clearModalInfo}
            //         currentUser={currentUser}
            //         updateComment={updateComment}
            //     />;
            //     break;
            case 'commentDream':
                component = <CommentDreamModal
                    info={info}
                    fetchCommentsByDream={fetchCommentsByDream}
                    comments={comments}
                    createComment={createComment}
                    clearModalInfo={clearModalInfo}
                    currentUser={currentUser}
                    updateComment={updateComment}
                    resetErrors={resetErrors}
                    errors={errors}

                />;
                break;
            default:
                return null;
        }
        return (
            <div className="modal-background" onClick={this.handleCloseModal} >
                <div className="modal-child" onClick={e => e.stopPropagation()} >
                    <span onClick={this.handleCloseModal} className="close-modal-btn">&#x2715;</span>
                    {component}
                    {/* <NewDreamContainer /> */}
                </div>
            </div>
        )
    }
}

const mapSTP = state => {
    // debugger;
    return {
        modal: state.ui.modal,
        currentUser: state.session.user,
        info: state.modalInfo,
        comments: state.comment,
        errors: state.errors.session,
        searchResults: state.search
    }
}

const mapDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    createDream: (dream) => dispatch(createDream(dream)),
    updateDream: (dreamId, dream) => dispatch(updateDream(dreamId, dream)),
    fetchCommentsByDream: (dreamId) => dispatch(fetchCommentsByDream(dreamId)),
    createComment: (dreamId, comment) => dispatch(createComment(dreamId, comment)),
    clearModalInfo: () => dispatch(clearModalInfo()),
    updateComment: (commentId, comment) => dispatch(updateComment(commentId, comment)),
    resetErrors: () => dispatch(resetErrors()),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchSearchResults: (searchParams) => dispatch(fetchSearchResults(searchParams)),
    clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapSTP, mapDTP)(Modal);