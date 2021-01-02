import axios from 'axios';

export const search = (searchParam) => (
  axios.get(`/api/search/${searchParam}`)
)