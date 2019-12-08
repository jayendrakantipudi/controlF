import axios from 'axios'
import {returnErrors}from './errorActions'
import {
GET_SERVICES,
ADD_SERVICE,
ADD_SLOT
} from './types'

export const allServices = () => (dispatch,getState) => {
  dispatch({type:GET_SERVICES})
  axios.get('/api/service/all')
    .then(res => dispatch({
      type: GET_SERVICES,
      payload:res.data
    }))
}


export const addService=({name,about,service_worker})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({name,about,service_worker})
  axios.post('/api/service/',body,config)
  .then(res=>dispatch({
    type:ADD_SERVICE,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}


export const addSlot=({start,end})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({start,end})
  axios.post('/api/slot/addslot',body,config)
  .then(res=>dispatch({
    type:ADD_SLOT,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}

