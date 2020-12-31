import {
  RECEIVE_USER,
} from '../actions/user_actions';

const UserReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  // let newState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return oldState;
  }
}

export default UserReducer;