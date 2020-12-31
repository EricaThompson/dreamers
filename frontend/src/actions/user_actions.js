import * as UserApiUtils from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

export const fetchUserById = userId => dispatch => (
  UserApiUtils.fetchUserById(userId)
  .then(user => dispatch(receiveUser(user.data)))
  .catch(err => console.log(err))
);

export const updateUser = (userId, updatedFields) => dispatch => (
  UserApiUtils.updateUser(userId, updatedFields)
  .then(user => dispatch(receiveUser(user.data)))
  .catch(err => console.log(err))
);