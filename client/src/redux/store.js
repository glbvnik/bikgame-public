import { applyMiddleware, createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const wrapper = createWrapper(makeStore)

export default wrapper
