import {
  SEARCH
} from '../actions/search_actions';

const SearchReducer = (oldState = {}, action) => {
  switch(action.type) {
    case SEARCH:
      let newState = {
        tags: action.payload[0],
        users: action.payload[1],
        dreams: action.payload[2]
      }
      return newState;
    case CLEAR_SEARCH:
      return {};
    default:
      return oldState;
  }
}

export default SearchReducer;