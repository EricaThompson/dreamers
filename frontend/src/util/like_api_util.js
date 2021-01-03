import axios from 'axios';

export const createLike = (dreamId) => (
    axios.post(`/api/likes/${dreamId}`)
); 

export const fetchLike = (likeId) => (
    axios.get(`/api/likes/${likeId}`)
);

export const fetchLikesByDream = (dreamId) => (
  axios.get(`/api/likes/dream/${dreamId}`)
);

export const fetchLikesByUser = (userId) => (
  axios.get(`/api/likes/user/${userId}`)
)

export const deleteLike = (likeId) => (
    axios.delete(`/api/likes/${likeId}`)
)


