import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import dream from './dream_reducer';
import comment from './comment_reducer';
import ui from './ui_reducer';


const RootReducer = combineReducers({
    session, 
    errors,
    ui,
    dream, 
    comment,
});

export default RootReducer;