import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
<<<<<<< HEAD
import { createComment } from './actions/comment_actions';

import { 
  fetchLike,
  createLike, 
  deleteLike
} from './actions/like_actions'

=======
>>>>>>> 6a9c9e24b91c583f86c54b708e2845472d882f09

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {

    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

<<<<<<< HEAD
  window.store = store 
  window.fetchLike = fetchLike
  window.createLike = createLike
  window.deleteLike = deleteLike



=======
>>>>>>> 6a9c9e24b91c583f86c54b708e2845472d882f09
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});