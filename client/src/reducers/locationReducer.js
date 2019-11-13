import {SEND_LOCATION,SELECT_CITY,GET_CITIES} from '../actions/types'

const initialState={
  order:null,
  all_cities:null,
  initial_center:null
}

export default function(state=initialState,action){
  switch (action.type){
    case SEND_LOCATION:
      return {
        ...state,
        order:action.payload
      }
    case SELECT_CITY:
    return {
      ...state,
      initial_center:action.payload
    }
    case GET_CITIES:
    return {
      ...state,
      all_cities:action.payload
    }
    default:
      return state
  }
}