import { SET_MODAL, SET_SIDEBAR } from '../types'

const initialState = {
    sidebar: false,
    modal: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR:
            return { ...state, sidebar: action.payload }

        case SET_MODAL:
            return { ...state, modal: action.payload }

        default:
            return state
    }
}

export default appReducer
