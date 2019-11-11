import {
CREATE_PROFESSIONAL_SUCCESS,
CREATE_PROFESSIONAL_FAIL,
IS_PROFESSIONAL_TRUE,
IS_PROFESSIONAL_FALSE,
CLEAR_PROFESSIONAL,
} from '../actions/types'

const initialState={
  professionalData:null,
  isProfessional:null,
  isLoading: false
}

export default function(state=initialState,action){
  switch (action.type) {
    case CREATE_PROFESSIONAL_SUCCESS:
      return{
        ...state,
        professionalData:action.payload,
        isProfessional:true,
        isLoading:false,
      }
    case CREATE_PROFESSIONAL_FAIL:
    return{
      ...state,
      professionalData:null,
      isLoading:false,
    }
    case IS_PROFESSIONAL_TRUE:
    return{
      ...state,
      isProfessional:action.payload
    }
    case CLEAR_PROFESSIONAL:
      return initialState
    default:
      return state
  }
}
