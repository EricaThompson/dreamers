import {
  RECEIVE_SESSION_ERRORS,
  RESET_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';
import {
  RECEIVE_USER_ERRORS,
} from '../actions/user_actions';
import {
  RECEIVE_TAG_ERRORS,
} from '../actions/tag_actions';
import {
  RECEIVE_DREAM_ERRORS,
} from '../actions/dream_actions';
import {
  RECEIVE_COMMENT_ERRORS,
} from '../actions/comment_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_TAG_ERRORS:
      return action.errors;
    case RECEIVE_DREAM_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RESET_ERRORS:
      return _nullErrors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;