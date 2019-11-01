import {GET_SERVICE, GET_SERVICETYPES} from './types';
import axios from 'axios';




export const get_service=(service)=>dispatch=>{
console.log('working')
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  var url = '/api/service/';
  const ser = url.concat(service);
  axios.get(ser,config)
    .then(res => dispatch({
      type: GET_SERVICE,
      payload:res.data
    }))

}
