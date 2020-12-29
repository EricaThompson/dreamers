import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';

export default combineReducers({
    modal: ModalReducer,
})