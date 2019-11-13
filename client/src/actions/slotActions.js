import axios from 'axios'
import {GET_SLOTS,BOOK_SLOT} from './types'

export const getSlots = () => dispatch => {
  
  axios
    .get('/api/slot/allslots')
    .then(res =>
      dispatch({
        type: GET_SLOTS,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}


export const bookSlot = (id,orderid) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({id,orderid})
  console.log('function called')
  axios
    .post('/api/booking/slotbooking',body,config)
    .then(res =>
      dispatch({
        type: BOOK_SLOT,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}