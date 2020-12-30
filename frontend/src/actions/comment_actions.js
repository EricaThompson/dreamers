import * as CommentApiUtil from '../util/comment_api_util'; 

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS, 
    comments
}); 

export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
}); 

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT, 
    commentId
})

export const clearComments = () => ({
    type: CLEAR_COMMENTS,
})

export const fetchCommentById = (commentId) => dispatch => (
    CommentApiUtil.fetchCommentById(commentId)
    .then(comment => dispatch(receiveComment(comment)))
    .catch(err => console.error(err))
)

export const fetchCommentsByDream = (dreamId) => dispatch => (
    CommentApiUtil.fetchCommentsByDream(dreamId)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(err => console.error(err))
)

export const fetchCommentsByUser = (userId) => dispatch => (
    CommentApiUtil.fetchCommentsByUser(userId)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(err => console.error(err))
)

export const createComment = (dreamId, comment) => dispatch => (
    CommentApiUtil.createComment(dreamId, comment)
    .then(comment => dispatch(receiveComment(comment)))
    .catch(err => console.error(err))
)

export const updateComment = (commentId, updatedFields) => dispatch => (
    CommentApiUtil.updateComment(commentId, updatedFields)
    .then(commentId => dispatch(receiveComment(commentId)))
    .catch(err => console.error(err))
)

export const deleteComment = (commentId) => dispatch => (
    CommentApiUtil.deleteComment(commentId)
    .then(() => dispatch(removeComment(commentId)))
)