import { MODAL_INFO, CLEAR_MODAL_INFO } from '../actions/modal_actions';

const ModalInfoReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case MODAL_INFO:
            return action.info;
        case CLEAR_MODAL_INFO:
            return {};
        default:
            return oldState;
    }
}

export default ModalInfoReducer;