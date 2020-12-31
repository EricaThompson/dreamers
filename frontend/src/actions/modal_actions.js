export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const MODAL_INFO = 'MODAL_INFO';

export const openModal = modal => ({
    type: OPEN_MODAL,
    modal
})

export const closeModal = () => ({
    type: CLOSE_MODAL
})

export const modalInfo = info => ({
    type: MODAL_INFO,
    info
})