import { combineReducers } from 'redux'
import appReducer from './appReducer'
import authReducer from './authReducer'
import dataReducer from './dataReducer'
import cartReducer from './cartReducer'
import pageReducer from './pageReducer'

const rootReducer = combineReducers({ app: appReducer, auth: authReducer, data: dataReducer, cart: cartReducer, page: pageReducer })

export default rootReducer
