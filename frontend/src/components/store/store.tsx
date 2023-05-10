import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers/index'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: reducers,
})

export default store
