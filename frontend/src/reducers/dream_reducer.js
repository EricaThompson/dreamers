import { 
    RECEIVE_ALL_DREAMS,
    RECEIVE_USER_DREAMS,
    RECEIVE_NEW_DREAM,
    REMOVE_DREAMS
} from '../actions/dream_actions'

const DreamReducer = (oldState = {all: {}, user: {}, new: undefined}, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch(action.type) {
        case RECEIVE_ALL_DREAMS:
            return action.dreams;
        case RECEIVE_USER_DREAMS:
            newState[action.user.id] = action.user; 
            return newState;
        case RECEIVE_NEW_DREAM:
            newState[action.dream.id] = action.dream; 
            return newState;
        case REMOVE_DREAMS:
            delete newState[action.dreamId]
            return newState; 
        default: 
            return oldState; 
    }
}

export default DreamReducer; 