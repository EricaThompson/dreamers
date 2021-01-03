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



export const fetchLike = (dreamId, like) => dispatch => (
    LikeApiUtil.fetchLike(dreamId, like)
    .then(payload => dispatch(receiveLike(payload.data)))
    .catch(err => console.error(err))
)

export const createLike = (dreamId, like) => dispatch => (
    LikeApiUtil.createLike(dreamId, like)
    .then(payload => dispatch(receiveLike(payload.data)))
    .catch(err => console.error(err))
)

export const deleteLike = (likeId) => dispatch => (
    LikeApiUtil.deleteLike(likeId)
    .then((payload) => dispatch(removeLike(payload.data)))
)