import {GET_SLOTS,BOOK_SLOT} from '../actions/types'

const initialState={
  all_slots:[],
}

export default function(state=initialState,action){
  switch (action.type){
    case GET_SLOTS:
      return {
        ...state,
        all_slots:action.payload
      }
      
    case BOOK_SLOT:
      return state
      
    default:
      return state
  }
}