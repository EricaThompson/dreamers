import * as SearchApiUtils from '../util/search_api_util';

export const SEARCH = 'SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const receiveSearchResults = (payload) => ({
  type: SEARCH,
  payload
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
})

export const fetchSearchResults = searchParams => dispatch => (
  SearchApiUtils.search(searchParams)
  .then(payload => dispatch(receiveSearchResults(payload.data))) 
  .catch(err => console.log(err))
)