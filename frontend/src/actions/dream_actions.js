import * as DreamApiUtils from '../util/dream_api_util';
import jwt_decode from 'jwt_decode';

export const RECEIVE_ALL_DREAMS = 'RECEIVE_ALL_DREAMS';
export const RECEIVE_USER_DREAMS = 'RECEIVE_USER_DREAMS';
export const RECEIVE_NEW_DREAM = 'RECEIVE_NEW_DREAM';
export const REMOVE_DREAMS = 'REMOVE_DREAMS';


export const receiveAllDreams = (dreams) => ({
    type: RECEIVE_ALL_DREAMS, 
    dreams
});

export const receiveUserDreams = (dreams) => ({
    type: RECEIVE_USER_DREAMS,
    dreams 
});

export const receiveNewDream = (dream) => ({
    type: RECEIVE_NEW_DREAM,
    dream
});

export const removeDreams = (dreamId) => ({
    type: REMOVE_DREAMS,
    dreamId
})


export const fetchDreams = () => dispatch => (
    DreamApiUtils.fetchDreams()
    .then(dreams => dispatch(receiveAllDreams(dreams)))
    .catch(err => console.log(err))
)

export const fetchDreamsByUser = userId => dispatch => (
    DreamApiUtils.fetchDreamsByUser(userId)
    .then(dreams => dispatch(receiveUserDreams(dreams)))
    .catch(err => console.error(err))
)

export const fetchDreamById = dreamId => dispatch => (
    DreamApiUtils.fetchDreamById(dreamId)
    .then(dreams => dispatch(receiveNewDream(dreams)))
    .catch(err => console.error(err))
)

export const fetchDreamsByType = type => dispatch => (
    DreamApiUtils.fetchDreamsByType(type)
    .then(dreams => dispatch(receiveAllDreams(dreams)))
    .catch(err => console.error(err))
)

export const fetchDreamsByTags = tags => dispatch => (
    DreamApiUtils.fetchDreamsByTags(tags)
    .then(dreams => dispatch(receiveAllDreams(dreams)))
    .catch(err => console.error(err))
)

export const createDream = dream => dispatch => (
    DreamApiUtils.createDream(dream)
    .then(dream => dispatch(receiveNewDream(dream)))
    .catch(err => console.error(err))
)

export const updateDream = (dreamId, updatedFields) => dispatch  => (
    DreamApiUtils.updateDream(dreamId, updatedFields)
    .then((dreamId, updatedFields)=> dispatch(receiveNewDream(dreamId, updatedFields)))
    .catch(err => console.error(err))
)

export const deleteDream = dreamId => dispatch => (
    DreamApiUtils.deleteDream(dreamId)
    .then(() => dispatch(removeDreams(dreamId)))
)
