import axios from 'axios';

export const createLike = (dreamId, like) => (
    axios.post(`/api/likes/${dreamId}`, like)
); 

export const fetchLikes = () => (
    axios.get(`/api/likes`)
)

export const fetchLike = (likeId) => (
    axios.get(`/api/likes/${likeId}`)
);

export const deleteLike = (likeId) => (
    axios.delete(`/api/likes/${likeId}`)
)


