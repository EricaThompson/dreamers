import { MODAL_INFO } from '../actions/modal_actions';

export default (oldState = null, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case MODAL_INFO:
            return action.info;
        default:
            return oldState;
    }
}