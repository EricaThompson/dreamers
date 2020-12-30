import axios from 'axios';

export const createTag = (tag) => (
  axios.post('/api/tags/', tag)
);

export const fetchTags = () => (
  axios.get('/api/tags/')
);

export const fetchMatchingTag = (tag) => (
  axios.get(`/api/tags/${tag}`)
);

export const fetchExactTag = (tag) => (
  axios.get(`/api/tags/exact/${tag}`)
);

export const deleteTag = (tag) => (
  axios.delete(`/api/tags/${tag}`)
);
