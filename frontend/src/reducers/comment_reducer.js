import {
    RECEIVE_ALL_COMMENTS, 
    RECEIVE_USER_COMMENTS, 
    RECEIVE_NEW_COMMENT, 
    REMOVE_COMMENT
} from '../actions/comment_actions';

const CommentReducer = (oldState = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch (action.type) {
        case RECEIVE_ALL_COMMENTS:
            return action.comments; 
        case RECEIVE_USER_COMMENTS:
            newState[action.user.id] = action.user
            return newState; 
        case RECEIVE_NEW_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState;
        default:
            return oldState; 
    }

}

export default CommentReducer; 