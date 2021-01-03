import * as LikeApiUtil from '../util/like_api_util';

export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
}); 

export const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
});

export const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId
})

export const fetchLike = (dreamId, like) => dispatch => (
    LikeApiUtil.fetchLike(dreamId, like)
    .then(like => dispatch(receiveLike(like)))
    .catch(err => console.error(err))
)

export const createLike = (dreamId, like) => dispatch => (
    LikeApiUtil.createLike(dreamId, like)
    .then(like => dispatch(receiveLike(like)))
    .catch(err => console.error(err))
)

export const deleteLike = (likeId, dream) => dispatch => (
    LikeApiUtil.deleteLike(likeId)
    .then(() => dispatch(removeLike(likeId)))
)