import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class ServicesDisplay extends Component{
  render(){
    return(
      <div>
      <table>
      <tr style={{height:'20%'}}>
        <td style={{width:'20%'}}>
          <img src={require('../assets/circle-cropped.png')} style={{width:'50%',float:'left',marginLeft:'10%',marginTop:'3%'}}/>
        </td>
        <td>
          <td style={{fontFamily: 'Acme, sans-serif',fontSize:'50px',textAlign:'left',color:'rgb(255, 151, 0)'}}>Carpentry -</td>
          <td style={{fontSize:'25px'}}> Deck building, fencing, pergola, custom cabinetry, railings</td>
        </td>
      </tr>
      <br/>
      <tr style={{height:'20%'}}>
        <td style={{width:'20%'}}>
          <img src={require('../assets/plumbing.png')} style={{width:'50%',float:'left',marginLeft:'10%',marginTop:'3%'}}/>
        </td>
        <td>
          <Link to='/service/plumber' style={{fontFamily: 'Acme, sans-serif',fontSize:'50px',float:'left',color:'rgb(255, 151, 0)'}}><td >Plumbing -</td></Link>
          <td style={{fontSize:'25px',paddingTop:'3%'}}>Hot water tank replacement, garbage disposals, leaky faucets</td>
        </td>
      </tr>
      </table>
      </div>


    )
  }

}

export default ServicesDisplay
