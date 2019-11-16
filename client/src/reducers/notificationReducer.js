import {
GET_NOTIFICATION
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
    default:
    return state
  }

}
