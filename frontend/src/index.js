import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

import {
  createDream,
} from './actions/dream_actions'

import { 
  createLike, 
  fetchLike, 
  fetchLikesByDream, 
  fetchLikesByUser, 
  deleteLike
} from './actions/like_actions'

import {
  createTag,
  deleteTag,
} from './actions/tag_actions'

import { fetchUsersByUserIds } from './util/user_api_util';

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

  window.store = store
  window.createLike = createLike
  window.fetchLike = fetchLike
  window.fetchLikesByDream = fetchLikesByDream
  window.fetchLikesByUser = fetchLikesByUser
  window.deleteLike = deleteLike
  window.createTag = createTag
  window.deleteTag = deleteTag
  window.createDream = createDream
  window.fetchUsersByUserIds = fetchUsersByUserIds;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});