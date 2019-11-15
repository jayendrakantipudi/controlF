import {GET_SERVICE, GET_SERVICETYPES, STORE_ORDER} from '../actions/types'

const initialState={
  ser:[],
  order_id:null
}

export default function(state=initialState,action){
  console.log('In reducer');
  console.log(GET_SERVICETYPES);
  switch (action.type){
    //console.log(GET_SERVICETYPES);
    case GET_SERVICE:
      return {
        ...state,
        ser:action.payload
      }
    case STORE_ORDER:
      return {
        ...state,
        order_id:action.payload
      }
    default:
      return state
  }
}
