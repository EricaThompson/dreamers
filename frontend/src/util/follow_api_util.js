import axios from 'axios';

export const fetchFollowed = userId => (
  axios.get(`/api/followed/${userId}`)
)

export const fetchFollowers = userId => (
  axios.get(`/api/followers/${userId}`)
)

export const followUser = userId => (
  axios.post(`/api/follow/${userId}`)
)

export const unfollowUser = userId => (
  axios.delete(`/api/follow/${userId}`)
)