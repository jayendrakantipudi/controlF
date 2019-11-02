import {GET_SERVICETYPES, GET_SERVICE} from './types';
import axios from 'axios';




export const get_services=(service)=>dispatch=>{
// console.log('working')
// console.log(GET_SERVICETYPES)
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  var url = '/api/serviceType/';
  const ser = url.concat(service);
  axios.get(ser,config)
    .then(res => {
       console.log("hiiiiii");
      dispatch({
      type: GET_SERVICE,
      payload:res.data
    }

    )}).catch(err => console.log(err));

    // console.log(res);

}
