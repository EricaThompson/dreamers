import {
  RECEIVE_FOLLOW_USERS
} from '../actions/follow_actions';

const FollowReducer = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_FOLLOW_USERS:
      return action.users;
    default:
      return oldState;
  }
}

export default FollowReducer;