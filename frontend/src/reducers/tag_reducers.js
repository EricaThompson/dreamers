import { 
    RECEIVE_TAGS,
    RECEIVE_TAG,
    REMOVE_TAG,
    CLEAR_TAG
} from '../actions/tag_actions';

const TagReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = Object.assign({}, oldState); 
    switch (action.type) {
        case RECEIVE_TAGS:
            return action.tags;
        case RECEIVE_TAG:
            newState[action.tag._id] = action.tag
            return newState
        case REMOVE_TAG:
            delete newState[action.tag]
            return newState
        case CLEAR_TAG:
            return {};
        default:
            return oldState; 
    }
}

export default TagReducer; 
