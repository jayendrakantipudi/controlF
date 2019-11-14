import axios from 'axios'
import {
GET_NOTIFICATION
} from './types'

export const getNotification = (id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
const body=JSON.stringify({id})
console.log(body)
axios.post('api/booking/notification',body,config)
.then(res=>{dispatch({
  type:GET_NOTIFICATION,
  payload:res.data
})
console.log(res.data)
})
}
