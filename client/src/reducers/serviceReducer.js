import {GET_SERVICE, GET_SERVICETYPES} from '../actions/types'

const initialState={
  ser:{},
}

export default function(state=initialState,action){
  switch (action.type){
    case GET_SERVICE:
      return {
        ...state,
        ser:action.payload
      }
    default:
      return state
  }
}