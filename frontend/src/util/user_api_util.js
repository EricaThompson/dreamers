import axios from 'axios';

export const fetchUserById = userId => (
  axios.get(`/api/users/user/${userId}`)
);

export const fetchUsersByUserIds = userIds => (
  axios.post('/api/users/array', userIds)
)

export const updateUser = (userId, updatedFields) => (
  axios.patch(`/api/users/${userId}`, updatedFields)
);