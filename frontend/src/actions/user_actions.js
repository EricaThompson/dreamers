import * as UserApiUtils from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
})
export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const fetchUserById = userId => dispatch => (
  UserApiUtils.fetchUserById(userId)
  .then(user => dispatch(receiveUser(user.data)))
  .catch(err => receiveErrors(err))
);

export const fetchUsersByUserIds = userIds => dispatch => (
  UserApiUtils.fetchUsersByUserIds(userIds)
  .then(users => dispatch(receiveUsers(users.data)))
  .catch(err => console.log(err))
)

export const updateUser = (userId, updatedFields) => dispatch => (
  UserApiUtils.updateUser(userId, updatedFields)
  .then(user => dispatch(receiveUser(user.data)))
  .catch(err => receiveErrors(err))
);