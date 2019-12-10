import axios from 'axios'
import {
GET_NOTIFICATION,
MESSAGE_NOTIFICATION
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

export const messageNotification = (user_id,professional_id,url,order_id) => dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({user_id,professional_id,url,order_id})
  axios.post('api/booking/messagenotification',body,config)
  .then(res=>{dispatch({
    type:MESSAGE_NOTIFICATION,
    payload:res.data
  })
  console.log(res.data)
  })

}
