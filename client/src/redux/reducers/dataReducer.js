import { HYDRATE } from 'next-redux-wrapper'
import { FETCH_DATA } from '../types'

const initialState = {
    swimsuits: [],
    swimsuit: {},
    collections: [],
    sets: [],
    types: [],
    images: [],
    prices: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...action.payload.data }

        case FETCH_DATA:
            return { ...state, ...action.payload }

        default:
            return state
    }
}

export default dataReducer
