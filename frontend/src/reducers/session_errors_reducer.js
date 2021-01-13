import {
  RECEIVE_SESSION_ERRORS,
  RESET_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

import {
  RECEIVE_ERRORS,
} from '../actions/error_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
    case RECEIVE_ERRORS:
      return action.errors;
    case RESET_ERRORS:
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;