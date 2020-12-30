import axios from 'axios';

export const createComment = (dreamId, comment) => (
  axios.post(`/api/comments/${dreamId}`, comment)
);

export const fetchCommentById = (commentId) => (
  axios.get(`/api/comments/${commentId}`)
);

export const fetchCommentsByDream = (dreamId) => (
  axios.get(`/api/comments/dream/${dreamId}`)
);

export const fetchCommentsByUser = (userId) => (
  axios.get(`/api/comments/user/${userId}`)
)

export const updateComment = (commentId, updatedFields) => (
  axios.patch(`/api/comments/${commentId}`, updatedFields)
)

export const deleteComment = (commentId) => (
  axios.delete(`/api/comments/${commentId}`)
)