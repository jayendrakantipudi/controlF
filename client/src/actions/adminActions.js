import axios from 'axios'
import {returnErrors}from './errorActions'
import {
GET_SERVICES
} from './types'

export const allServices = () => (dispatch,getState) => {
  dispatch({type:GET_SERVICETYPES})
  axios.get('/api/service/all')
    .then(res => dispatch({
      type: GET_SERVICES,
      payload:res.data
    }))
}

