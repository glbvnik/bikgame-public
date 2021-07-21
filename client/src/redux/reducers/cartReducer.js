import lscache from 'lscache'
import { ADD_ITEM, CHANGE_QUANTITY, CLEAR_CART, DELETE_ITEM, INIT_CART } from '../types'

const initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CART:
            if (!action.payload.cart) return state

            const initialCart = action.payload.cart.map(item => {
                const swimsuit = action.payload.swimsuits.find(swimsuit => swimsuit.id === item.id)

                const set = action.payload.sets.find(set => set.id === item.setId)

                return (swimsuit && set.topSizes.includes(item.topSize) && set.bottomSizes.includes(item.bottomSize)) && { ...item, image: swimsuit.images[0], name: swimsuit.name, color: swimsuit.color, price: swimsuit.price, total: swimsuit.price * item.quantity }
            }).filter(item => item && item)

            lscache.set('cart', initialCart, 20160)

            return { ...state, cart: initialCart }

        case ADD_ITEM:
            if (state.cart.some(item => item.id === action.payload.id && item.topSize === action.payload.topSize && item.bottomSize === action.payload.bottomSize)) {
                const newCart = state.cart.map(item => item.id === action.payload.id && item.topSize === action.payload.topSize && item.bottomSize === action.payload.bottomSize ? { ...item, quantity: parseInt(item.quantity) + parseInt(action.payload.quantity), total: parseInt(item.total) + parseInt(action.payload.total) } : item)

                lscache.set('cart', newCart, 20160)

                return { ...state, cart: newCart }
            }

            lscache.set('cart', [...state.cart, action.payload], 20160)

            return { ...state, cart: [...state.cart, action.payload] }

        case DELETE_ITEM:
            const newCart1 = state.cart.filter(item => item.id !== parseInt(action.payload.id) || item.topSize !== action.payload.topSize || item.bottomSize !== action.payload.bottomSize)

            lscache.set('cart', newCart1, 20160)

            return { ...state, cart: newCart1 }

        case CHANGE_QUANTITY:
            if (action.payload.quantity < 0 || action.payload.quantity === '0') {
                const newCart = state.cart.filter(item => item.id !== parseInt(action.payload.id) || item.topSize !== action.payload.topSize || item.bottomSize !== action.payload.bottomSize)

                lscache.set('cart', newCart, 20160)

                return { ...state, cart: newCart }
            }

            const newCart2 = state.cart.map(item => item.id === parseInt(action.payload.id) && item.topSize === action.payload.topSize && item.bottomSize === action.payload.bottomSize ? {...item, quantity: action.payload.quantity, total: action.payload.quantity * item.price} : item)

            lscache.set('cart', newCart2, 20160)

            return { ...state, cart: newCart2 }

        case CLEAR_CART:
            lscache.remove('cart')

            return { ...state, cart: action.payload }
        default:
            return state
    }
}

export default cartReducer
