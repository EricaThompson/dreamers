import * as LikeApiUtil from '../util/like_api_util';

export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const CLEAR_LIKE = 'CLEAR_LIKE';

export const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
}); 

export const receiveLike = (payload) => ({
    type: RECEIVE_LIKE,
    like: payload.like,
    dream: payload.dream
});

export const removeLike = (payload) => ({
    type: REMOVE_LIKE,
    likeId: payload.likeId,
    dream: payload.dream
})

export const clearLike = () => ({
    type: CLEAR_LIKE
})

export const fetchLike = (likeId) => dispatch => (
    LikeApiUtil.fetchLike(likeId)
    .then(payload => dispatch(receiveLike(payload.data)))
)

export const fetchLikesByDream = (dreamId) => dispatch => (
    LikeApiUtil.fetchLikesByDream(dreamId)
    .then(likes => dispatch(receiveLikes(likes.data)))
)

export const fetchLikesByUser = (userId) => dispatch => (
    LikeApiUtil.fetchLikesByUser(userId)
    .then(likes => dispatch(receiveLikes(likes.data)))
)

export const createLike = (dreamId) => dispatch => (
    LikeApiUtil.createLike(dreamId)
    .then(payload => dispatch(receiveLike(payload.data)))
)

export const deleteLike = (likeId) => dispatch => (
    LikeApiUtil.deleteLike(likeId)
    .then((payload) => dispatch(removeLike(payload.data)))
)