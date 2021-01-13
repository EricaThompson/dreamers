import * as TagApiUtil from '../util/tag_api_util';
import { receiveErrors } from './actions/error_actions';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const CLEAR_TAG = 'CLEAR_TAG';

export const receiveTags = tags => ({
    type: RECEIVE_TAGS, 
    tags 
});

export const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
});

export const removeTag = tagId => ({
    type: REMOVE_TAG,
    tagId
});

export const clearTag = () => ({
    type: CLEAR_TAG
});


export const fetchTags = () => dispatch => (
    TagApiUtil.fetchTags()
    .then(tags => dispatch(receiveTags(tags)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
)

export const fetchMatchingTag = (tag) => dispatch => (
    TagApiUtil.fetchMatchingTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
)

export const fetchExactTag = (tag) => dispatch => (
    TagApiUtil.fetchExactTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
)

export const createTag = (tag) => dispatch => (
    TagApiUtil.createTag(tag)
    .then(tag => dispatch(receiveTag(tag.data)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
)
export const deleteTag = (tag) => dispatch => (
    TagApiUtil.deleteTag(tag)
    .then(()=> dispatch(removeTag(tag.data)))
)


