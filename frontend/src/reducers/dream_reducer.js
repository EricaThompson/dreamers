import { 
    RECEIVE_DREAMS,
    RECEIVE_DREAM,
    REMOVE_DREAMS,
    CLEAR_DREAMS,
} from '../actions/dream_actions';
import {
    SEARCH
} from '../actions/search_actions';

const DreamReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch(action.type) {
        case RECEIVE_DREAMS:
            action.dreams.forEach(dream => {
                newState[dream._id] = dream
            })
            return newState;
        case SEARCH:
            return action.dreams;
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