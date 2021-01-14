import axios from 'axios';

export const createDream = dream => (
  axios.post('/api/dreams/', dream)
)

export const fetchDreams = () => (
  axios.get('/api/dreams/')
)

export const fetchFollowedUsersDreams = () => (
  axios.get('/api/dreams/followed')
)

export const fetchDreamById = dreamId => (
  axios.get(`/api/dreams/${dreamId}`)
)

export const fetchDreamsByType = type => (
  axios.get(`/api/dreams/type/${type}`)
)

export const fetchDreamsByUser = userId => (
  axios.get(`/api/dreams/user/${userId}`)
)

export const fetchDreamsByTags = tags => (
  axios.post('/api/dreams/tags', tags)
)

export const updateDream = (dreamId, updatedFields) => (
  axios.patch(`/api/dreams/${dreamId}`, updatedFields)
)

export const deleteDream = dreamId => (
  axios.delete(`/api/dreams/${dreamId}`)
)
