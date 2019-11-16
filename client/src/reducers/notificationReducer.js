import {
GET_NOTIFICATION,
MESSAGE_NOTIFICATION
} from '../actions/types'

const initialState={
  notifications:[]
}

export default function(state=initialState,action){
  switch(action.type){
    case GET_NOTIFICATION:
      return{
        ...state,
        notifications:action.payload
      }
      case MESSAGE_NOTIFICATION:
      return state
    default:
    return state
  }

}
