import { 
    RECEIVE_DREAMS,
    RECEIVE_DREAM,
    REMOVE_DREAMS,
    CLEAR_DREAMS,
} from '../actions/dream_actions'
import {
    RECEIVE_NEW_COMMENT,
    REMOVE_COMMENT
} from '../actions/comment_actions';


import { 
    RECEIVE_LIKE, 
    REMOVE_LIKE,
} from '../actions/like_actions'

const DreamReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch(action.type) {
        
        case RECEIVE_DREAMS:
            action.dreams.forEach(dream => {
                newState[dream._id] = dream
            })
            return newState;
        case RECEIVE_NEW_COMMENT:
        case REMOVE_COMMENT:
        case RECEIVE_LIKE:
        case REMOVE_LIKE:
        case RECEIVE_DREAM:
            newState[action.dream._id] = action.dream; 
            return newState;
        case REMOVE_DREAMS:
            delete newState[action.dreamId]
            return newState; 
        case CLEAR_DREAMS:
            return {};
        default: 
            return oldState; 
    }
}

export default DreamReducer; 