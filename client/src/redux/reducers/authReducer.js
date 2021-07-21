import { HYDRATE } from 'next-redux-wrapper'
import { SET_ADMIN, SET_SIGNEDIN } from '../types'

const initialState = {
    admin: false,
    signedIn: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...action.payload.auth }

        case SET_ADMIN:
            return { ...state, admin: action.payload }

        case SET_SIGNEDIN:
            return { ...state, signedIn: action.payload }

        default:
            return state
    }
}

export default authReducer
