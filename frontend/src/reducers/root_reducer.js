import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';
import dream from './dream_reducer';
import comment from './comment_reducer';
import user from './user_reducer';
import search from './search_reducer';
import modalInfo from './modal_info_reducer';
import tag from './tag_reducers'; 
import like from './like_reducer'

const RootReducer = combineReducers({
    session, 
    errors,
    ui,
    dream, 
    comment,
    user,
    search,
    modalInfo, 
    tag, 
    like
});

export default RootReducer;