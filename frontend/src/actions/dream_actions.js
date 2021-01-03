import * as DreamApiUtils from '../util/dream_api_util';

export const RECEIVE_DREAMS = 'RECEIVE_DREAMS';
export const RECEIVE_DREAM = 'RECEIVE_DREAM';
export const REMOVE_DREAMS = 'REMOVE_DREAMS';
export const CLEAR_DREAMS = 'CLEAR_DREAMS';
export const RECEIVE_DREAM_ERRORS = "RECEIVE_DREAM_ERRORS";

// export const RECEIVE_NEW_DREAM = 'RECEIVE_NEW_DREAM';

export const receiveDreams = (dreams) => ({
    type: RECEIVE_DREAMS, 
    dreams
});

export const receiveDream = (dream) => {
    return {
    type: RECEIVE_DREAM,
    dream
}};

export const removeDreams = (dreamId) => ({
    type: REMOVE_DREAMS,
    dreamId
})

export const clearDreams = () => ({
    type: CLEAR_DREAMS,
})

export const receiveErrors = errors => {
    // debugger;
    return {
    type: RECEIVE_DREAM_ERRORS,
    errors
}};

export const fetchDreams = () => dispatch => (
    DreamApiUtils.fetchDreams()
    .then(dreams => dispatch(receiveDreams(dreams.data)))
        .catch(err => receiveErrors(err))
)

export const fetchDreamsByUser = userId => dispatch => (
    DreamApiUtils.fetchDreamsByUser(userId)
    .then(dreams => dispatch(receiveDreams(dreams.data)))
    .catch(err => receiveErrors(err))
)

export const fetchDreamById = dreamId => dispatch => (
    DreamApiUtils.fetchDreamById(dreamId)
    .then(dream => dispatch(receiveDream(dream.data)))
    .catch(err => receiveErrors(err))
)

export const fetchDreamsByType = type => dispatch => (
    DreamApiUtils.fetchDreamsByType(type)
    .then(dreams => dispatch(receiveDreams(dreams.data)))
    .catch(err => receiveErrors(err))
)

export const fetchDreamsByTags = tags => dispatch => (
    DreamApiUtils.fetchDreamsByTags(tags)
    .then(dreams => dispatch(receiveDreams(dreams.data)))
    .catch(err => receiveErrors(err))
)

export const createDream = dream => dispatch => (
    DreamApiUtils.createDream(dream)
    .then(dream => dispatch(receiveDream(dream.data)))
    .catch(err => receiveErrors(err))
)

export const updateDream = (dreamId, updatedFields) => dispatch  => (
    DreamApiUtils.updateDream(dreamId, updatedFields)
    .then(dream => dispatch(receiveDream(dream)))
    .catch(err => receiveErrors(err))
)

export const deleteDream = dreamId => dispatch => (
    DreamApiUtils.deleteDream(dreamId)
    .then(dreamId => dispatch(removeDreams(dreamId)))
)
