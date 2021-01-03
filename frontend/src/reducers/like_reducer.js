import { 
    RECEIVE_LIKES,
    RECEIVE_LIKE,
    REMOVE_LIKE
} from '../actions/like_actions'

const LikeReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch (action.type) {
        case RECEIVE_LIKES:
            return action.likes; 
        case RECEIVE_LIKE:
            newState[action.like._id] = action.like
            return newState; 
        case REMOVE_LIKE:
            delete newState[action.like]
            return newState;
        default: 
            return oldState; 
    }
}

export default LikeReducer; 