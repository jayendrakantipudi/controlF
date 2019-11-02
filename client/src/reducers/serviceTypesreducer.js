import {GET_SERVICE, GET_SERVICETYPES} from '../actions/types'

const initialState={
  ser:[],
}

export default function(state=initialState,action){
  console.log('In reducer');
  console.log(GET_SERVICETYPES);
  switch (action.type){
    console.log(GET_SERVICETYPES);
    case GET_SERVICE:
      return {
        ...state,
        ser:action.payload
      }
    default:
      return state
  }
}