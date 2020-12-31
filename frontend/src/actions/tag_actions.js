import * as TagApiUtil from '../util/tag_api_util';

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
    .catch(err => console.log(err))
)

export const fetchMatchingTag = (tag) => dispatch => (
    TagApiUtil.fetchMatchingTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(err => console.log(err))
)

export const fetchExactTag = (tag) => dispatch => (
    TagApiUtil.fetchExactTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(err => console.log(err))
)

export const deleteTag = (tag) => dispatch => (
    TagApiUtil.deleteTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
)


