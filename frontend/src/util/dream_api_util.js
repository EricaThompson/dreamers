import axios from 'axios';

export const createDream = dream => (
  axios.post('/api/dreams/', dream)
)

export const fetchDreams = () => (
  axios.get('/api/dreams/')
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
  axios.post(`/api/dreams/update/${dreamId}`, updatedFields)
)

export const deleteDream = dreamId => (
  axios.delete(`/api/dreams/${dreamId}`)
)
