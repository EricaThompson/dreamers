import {
    RECEIVE_COMMENTS, 
    RECEIVE_COMMENT,
    RECEIVE_NEW_COMMENT,
    REMOVE_COMMENT,
    CLEAR_COMMENTS
} from '../actions/comment_actions';

const CommentReducer = (oldState = {} , action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch (action.type) {
        case RECEIVE_COMMENTS:
            action.comments.forEach(comment => {
                newState[comment._id] = comment
            })
            return newState;
        case RECEIVE_NEW_COMMENT:
        case RECEIVE_COMMENT:
            newState[action.comment._id] = action.comment
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState;
        case CLEAR_COMMENTS:
            return {};
        default:
            return oldState; 
    }

}

export default CommentReducer; 