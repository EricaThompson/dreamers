import * as FollowApiUtil from '../util/follow_api_util';
import { receiveUser } from './user_actions';

export const RECEIVE_FOLLOW_USERS = 'RECEIVE_FOLLOW_USERS';

export const receiveFollowUsers = (users) => ({
  type: RECEIVE_FOLLOW_USERS,
  users
})

export const fetchFollowed = userId => dispatch => (
  FollowApiUtil.fetchFollowed(userId)
  .then(payload => dispatch(receiveFollowUsers(payload.data)))
  .catch(err => console.log(err))
)

export const fetchFollowers = userId => dispatch => (
  FollowApiUtil.fetchFollowers(userId)
  .then(payload => dispatch(receiveFollowUsers(payload.data)))
  .catch(err => console.log(err))
)

export const followUser = userId => dispatch => (
  FollowApiUtil.followUser(userId)
  .then(payload => dispatch(receiveUser(payload.data)))
  .catch(err => console.log(err))
)

export const unfollowUser = userId => dispatch => (
  FollowApiUtil.unfollowUser(userId)
  .then(payload => dispatch(receiveUser(payload.data)))
  .catch(err => console.log(err))
)