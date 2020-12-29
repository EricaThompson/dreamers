import axios from 'axios';
​
// returns errors or the newly created dream
export const createDream = dream => (
  axios.post('/api/dreams/', dream)
)
​
// returns a list of all dreams
export const fetchDreams = () => (
  axios.get('/api/dreams/')
)
​
// returns errors or a dream with matching id
export const fetchDreamById = dreamId => (
  axios.get(`/api/dreams/${dreamId}`)
)
​
// returns errors or a list of dreams with matching type
export const fetchDreamsByType = type => (
  axios.get(`/api/dreams/type/${type}`)
)
​
// returns errors or a list of dreams authored by the specified users
export const fetchDreamsByUser = userId => (
  axios.get(`/api/dreams/user/${userId}`)
)
​
// returns errors or a list of dreams with matching tags
export const fetchDreamsByTags = tags => (
  axios.post('/api/dreams/tags', tags)
)
​
// returns errors or the id of the dream updated - subject to change
export const updateDream = (dreamId, updatedFields) => (
  axios.post(`/api/dreams/update/${dreamId}`, updatedFields)
)
​
// returns errors or the id of the dream deleted
export const deleteDream = dreamId => (
  axios.delete(`/api/dreams/${dreamId}`)
