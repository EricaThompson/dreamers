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

export const fetchLike = (like) => dispatch => (
    LikeApiUtil.fetchLike(like)
    .then(like => dispatch(fetchLike(like)))
    .catch(err => console.error(err))
)

export const createLike = (dreamId, like) => dispatch => (
    LikeApiUtil.createLike(dreamId, like)
    .then(like => dispatch(createLike(like)))
    .catch(err => console.error(err))
)

export const deleteLike = (like) => dispatch => (
    LikeApiUtil.deleteLike(like)
    .then(() => dispatch(removeLike(like)))
)