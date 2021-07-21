import { HYDRATE } from 'next-redux-wrapper'
import { SET_PAGE } from '../types'

const initialState = {
    name: '',
    text: ''
}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...action.payload.page }

        case SET_PAGE:
            return { ...state, name: action.payload.name, text: action.payload.text }

        default:
            return state
    }
}

export default pageReducer
