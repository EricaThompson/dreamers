import React from 'react';
import { closeModal, clearModalInfo } from '../../actions/modal_actions';
import { createDream, updateDream } from '../../actions/dream_actions';
import { connect } from 'react-redux';
import NewDream from '../dreams/new_dream';
import CommentDreamModal from '../feed/comment_dream_modal';
import { fetchCommentsByDream, createComment, deleteComment } from '../../actions/comment_actions';
import { updateComment } from '../../actions/comment_actions';
import { resetErrors } from '../../actions/session_actions';
import { fetchSearchResults, clearSearch } from '../../actions/search_actions';
import { createTag } from '../../actions/tag_actions';
import { createLike, deleteLike, fetchLikesByDream } from '../../actions/like_actions';
import { receiveErrors, clearErrors } from '../../actions/error_actions';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        this.props.closeModal();
        this.props.clearModalInfo();
        this.props.clearSearch();
    }

    render() {
        let { 
            modal, 
            currentUser, 
            info, 
            fetchCommentsByDream, 
            comments, 
            createComment,
            deleteComment,
            clearModalInfo, 
            updateComment, 
            errors, 
            clearSearch, 
            fetchSearchResults, 
            searchResults, 
            createTag, 
            createDream, 
            updateDream,
            dream,
            createLike,
            deleteLike,
            fetchLikesByDream,
            receiveErrors, 
            clearErrors,
            closeModal,
            resetErrors
        } = this.props;
        if (!modal) {
            return null;
        }
        let component;
        switch (modal) {
            case 'newDream':
                component = <NewDream
                    currentUser={currentUser}
                    createDream={createDream}
                    updateDream={updateDream}
                    info={info}
                    resetErrors={resetErrors}
                    errors={errors}
                    clearSearch={clearSearch}
                    fetchSearchResults={fetchSearchResults}
                    searchResults={searchResults}
                    createTag={createTag}
                    closeModal={closeModal}
                    receiveErrors={receiveErrors}
                    clearErrors={clearErrors}
                />;
                break;
            case 'commentDream':
                component = <CommentDreamModal
                    info={info}
                    fetchCommentsByDream={fetchCommentsByDream}
                    comments={comments}
                    createComment={createComment}
                    clearModalInfo={clearModalInfo}
                    currentUser={currentUser}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    resetErrors={resetErrors}
                    errors={errors}
                    dream={dream}
                    createLike = {createLike}
                    deleteLike = {deleteLike}
                    fetchLikesByDream={fetchLikesByDream}
                    clearErrors={clearErrors}
                />;
                break;
            default:
                return null;
        }
        return (
            <div className="modal-background" 
                onClick={this.handleCloseModal} >
                <div className="modal-child" 
                    onClick={e => e.stopPropagation()} >
                        <span 
                            onClick={this.handleCloseModal} 
                            className="close-modal-btn"
                        >
                            &#x2715;
                        </span>
                        {component}
                </div>
            </div>
        )
    }
}

const mapSTP = state => {
    return {
        modal: state.ui.modal,
        currentUser: state.session.user,
        info: state.modalInfo,
        comments: state.comment,
        errors: state.errors.session,
        searchResults: state.search,
        dream: state.dream
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
    createTag: (tag) => dispatch(createTag(tag)),
    createLike: (dreamId)=> dispatch(createLike(dreamId)),
    deleteLike: (likeId)=> dispatch(deleteLike(likeId)),
    fetchLikesByDream: (dreamId) => dispatch(fetchLikesByDream(dreamId)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)), 
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapSTP, mapDTP)(Modal);