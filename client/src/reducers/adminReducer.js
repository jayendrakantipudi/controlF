import {
GET_SERVICES,
ADD_SERVICE,
ADD_SLOT
} from '../actions/types'

const initialState={
  services:null
}

export default function(state=initialState,action){
  switch(action.type){
    case GET_SERVICES:
      return{
        ...state,
        services:action.payload
      }
    case ADD_SERVICE:
      return state
    case ADD_SLOT:
      return state
    default:
      return state
  }

}
