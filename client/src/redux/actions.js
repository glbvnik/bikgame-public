import { check } from '../http/user.http'
import { getSwimsuit } from '../http/swimsuit.http'
import { getCollection } from '../http/collection.http'
import { getSet } from '../http/set.http'
import { getPage } from '../http/page.http'
import { ADD_ITEM, CHANGE_QUANTITY, CLEAR_CART, DELETE_ITEM, FETCH_DATA, INIT_CART, SET_ADMIN, SET_MODAL, SET_PAGE, SET_SIDEBAR, SET_SIGNEDIN } from './types'

//APP
export const setSidebar = bool => {
    return { type: SET_SIDEBAR, payload: bool }
}

export const setModal = bool => {
    return { type: SET_MODAL, payload: bool }
}

//AUTH
export const setAuth = () => {
    return async dispatch => {
        const { data } = await check()

        data.role ? dispatch({ type: SET_SIGNEDIN, payload: true }) : dispatch({ type: SET_SIGNEDIN, payload: false })

        data.role === 'ADMIN' ? dispatch({ type: SET_ADMIN, payload: true }) : dispatch({ type: SET_ADMIN, payload: false })
    }
}

//DATA
export const fetchData = http => {
    return async dispatch => {
        const { data } = await getCollection()

        const payload = { collections: data }

        for (const key in http) {
            if (http.hasOwnProperty(key)) {
                const { data } = await http[key]()

                payload[key] = data
            }
        }

        dispatch({ type: FETCH_DATA, payload })
    }
}

//CART
export const initCart = cart => {
    return async dispatch => {
        const { data: swimsuits } = await getSwimsuit()

        const { data: sets } = await getSet()

        dispatch({ type: INIT_CART, payload: { cart, swimsuits, sets } })
    }
}

export const addItem = item => {
    return { type: ADD_ITEM, payload: item }
}

export const delItem = (id, topSize, bottomSize) => {
    return { type: DELETE_ITEM, payload: { id, topSize, bottomSize } }
}

export const changeQuantity = (quantity, id, topSize, bottomSize) => {
    return { type: CHANGE_QUANTITY, payload: { quantity, id, topSize, bottomSize } }
}

export const clearCart = () => {
    return { type: CLEAR_CART, payload: [] }
}

//PAGE
export const setPage = name => {
    return async dispatch => {
        const {data} = await getPage(name)

        if (!data) return false

        dispatch({ type: SET_PAGE, payload: data })

        return true
    }
}
