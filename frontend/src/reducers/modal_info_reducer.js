import { MODAL_INFO, CLEAR_MODAL_INFO } from '../actions/modal_actions';

import {
    RECEIVE_LIKE,
    REMOVE_LIKE,
} from '../actions/like_actions'

const ModalInfoReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case MODAL_INFO:
            return action.info;
        case RECEIVE_LIKE:
            if (Object.values(newState).length > 0) {
                newState.likes.push(action.like);
            }
            return newState;
        case REMOVE_LIKE:
            if (Object.values(newState).length > 0) {
                newState.likes = [];
            }
            return newState;
        case CLEAR_MODAL_INFO:
            return {};
        default:
            return oldState;
    }
}

export default ModalInfoReducer;