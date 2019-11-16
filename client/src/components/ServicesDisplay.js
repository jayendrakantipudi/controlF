import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import '../styles/serviceDisplay.css'
import ScrollUpButton from "react-scroll-up-button";

class ServicesDisplay extends Component{
  render(){
var mybutton = document.getElementById("myBtn");
    return(
      <div>
      <table style={{marginLeft:'10%'}}>
      <tr style={{height:'20%'}}>
        <td>
            <Link to='/service/carpenter' style={{fontSize:'35px',float:'left',color:'rgb(255, 151, 0)'}}><td>Carpentry -</td></Link>
          <td style={{fontSize:'25px',paddingTop:'2%'}}> Deck building, fencing, pergola, custom cabinetry, railings</td>
        </td>
      </tr>
      <br/>
      <tr style={{height:'20%'}}>
        <td>
          <Link to='/service/plumber' style={{fontSize:'35px',float:'left',color:'rgb(255, 151, 0)'}}><td >Plumbing -</td></Link>
          <td style={{fontSize:'25px',paddingTop:'2%'}}>Hot water tank replacement, garbage disposals, leaky faucets</td>
        </td>
      </tr>
      <br/>
      <tr style={{height:'20%'}}>
        <td>
          <Link to='/service/electrician' style={{fontSize:'35px',float:'left',color:'rgb(255, 151, 0)'}}><td >Electrical -</td></Link>
          <td style={{fontSize:'25px',paddingTop:'2%'}}>Replacing/adding electrical outlets, light fixture installation, installing ceiling fans</td>
        </td>
      </tr>
      <br/>
      <tr style={{height:'20%'}}>
        <td>
          <Link to='/service/cleaning' style={{fontSize:'35px',float:'left',color:'rgb(255, 151, 0)'}}><td >Cleaning -</td></Link>
          <td style={{fontSize:'25px',paddingTop:'2%'}}>Keeping your home, office, or rental in tip-top shape with preventive maintenance</td>
        </td>
      </tr>
      </table>

      </div>


    )
  }

}

export default ServicesDisplay
