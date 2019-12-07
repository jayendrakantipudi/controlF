import
{SEND_MESSAGE,
GET_MESSAGES} from '../actions/types'

const initialState={
flag:0,
messages:[],
isLoading:false
}


export default function(state=initialState, action){
  switch(action.type){
    case 'SEND_MESSAGE':
      return{
          ...state,
          flag:!state.flag,
          isLoading:true
      }
      case 'GET_MESSAGES':
        return{
            ...state,
            messages:action.payload,
            isLoading:false
        }
    default:
      return state
  }
}
