import React,{Component} from 'react'

export default class Footer extends Component{

  render(){
    return(
      <div style={{backgroundColor:"black",color:'white'}}><br/><br/>
      <table>
      <tr style={{fontSize:'28px',fontFamily: 'Acme, sans-serif' }}>
        <td>
          ControlF
        </td>
        <td>
          Our Goal
        </td>
        <td>
          Contact Us Today!!
        </td>
      </tr>
      <tr>
        <td style={{padding:'3%',color:'lightgray'}}>
        ControlF is a website that makes finding services easier to people.
        </td>
        <td style={{padding:'7%',color:'lightgray'}}>
        Our job is to help you get the stuff done that you can’t around the house! If it’s just out of your league or you just don’t want to do the work we can help!
        </td>
        <td style={{padding:'5%',color:'lightgray'}}>
        Contact us on bhogadiyashwanth9@gmail.com and we will get you booked with one of our professional serviceman!
        </td>
      </tr>
      </table>
      <div width="100%" style={{backgroundColor:'#262626'}}><br/><br/></div>
      </div>
    )
  }

}
