import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../actions/user_actions';
import {
  SEARCH,
} from '../actions/search_actions';


const UserReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case RECEIVE_USERS:
    case SEARCH:
      return action.users;
    default:
      return oldState;
  }
}

export default UserReducer;