import * as CommentApiUtil from '../util/comment_api_util'; 

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_USER_COMMENTS = "RECEIVE_USER_COMMENTS";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const receiveAllComments = (comments) => ({
    type: RECEIVE_ALL_COMMENTS, 
    comments
}); 

export const receiveUserComments = (comments) => ({
    type: RECEIVE_USER_COMMENTS,
    comments
})

export const receiveNewComment = (comment) => ({
    type: RECEIVE_NEW_COMMENT,
    comment
}); 

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT, 
    commentId
})

export const fetchCommentById = (commentId) => dispatch => (
    CommentApiUtil.fetchCommentById(commentId)
    .then(comment => dispatch(receiveNewComment(comment)))
    .catch(err => console.error(err))
)

export const fetchCommentsByDream = (dreamId) => dispatch => (
    CommentApiUtil.fetchCommentsByDream(dreamId)
    .then(comments => dispatch(receiveAllComments(comments)))
    .catch(err => console.error(err))
)

export const fetchCommentsByUser = (userId) => dispatch => (
    CommentApiUtil.fetchCommentsByUser(userId)
    .then(comments => dispatch(receiveUserComments(comments)))
    .catch(err => console.error(err))
)

export const createComment = (dreamId, comment) => dispatch => (
    CommentApiUtil.createComment(dreamId, comment)
    .then((dreamId, comment) => dispatch(receiveNewComment(dreamId, comment)))
    .catch(err => console.error(err))
)

export const updateComment = (commentId, updatedFields) => dispatch => (
    CommentApiUtil.updateComment(commentId, updatedFields)
    .then((commentId, updatedFields) => dispatch(receiveNewComment(commentId, updatedFields)))
    .catch(err => console.error(err))
)

export const deleteComment = (commentId) => dispatch => (
    CommentApiUtil.deleteComment(commentId)
    .then(() => dispatch(removeComment(commentId)))
)