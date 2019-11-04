import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import profReducer from './profReducer'
import serviceReducer from './serviceReducer'

export default combineReducers({
  item: itemReducer,
  error:errorReducer,
  auth:authReducer,
  prof:profReducer,
  service:serviceReducer,
})
