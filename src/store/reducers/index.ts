import { combineReducers } from 'redux';
import {  persistReducer  } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import post from './post'
import account from './account'

const reducers = combineReducers({
  postReducer: post,
  accountReducer: account,
})

const config = {
  key: 'root',
  storage
}

export default persistReducer(config, reducers)
