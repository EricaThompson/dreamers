import {
  SEARCH,
  CLEAR_SEARCH
} from '../actions/search_actions';

const SearchReducer = (oldState = {}, action) => {
  switch(action.type) {
    case SEARCH:
      return {
        tags: action.tags,
        users: action.users,
        dreams: action.dreams
      }
    case CLEAR_SEARCH:
      return {};
    default:
      return oldState;
  }
}

export default SearchReducer;