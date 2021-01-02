import axios from 'axios';

export const createLike = (dreamId, like) => (
    axios.post(`/api/likes/${dreamId}`, like)
); 

export const fetchLike = (like) => (
    axios.get(`/api/likes/${like}`)
);

export const deleteLike = (like) => (
    axios.delete(`/api/likes/${like}`)
)


