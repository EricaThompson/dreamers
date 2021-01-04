import axios from 'axios';

export const fetchFollowed = userId => (
  axios.get(`/api/users/followed/${userId}`)
)

export const fetchFollowers = userId => (
  axios.get(`/api/users/followers/${userId}`)
)

export const followUser = userId => (
  axios.post(`/api/users/follow/${userId}`)
)

export const unfollowUser = userId => (
  axios.delete(`/api/users/follow/${userId}`)
)