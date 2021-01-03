import {
  RECEIVE_USER,
} from '../actions/user_actions';
import {
  SEARCH,
} from '../actions/search_actions';


const UserReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  // let newState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SEARCH:
      return action.users;
    default:
      return oldState;
  }
}

export default UserReducer;