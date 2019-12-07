import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {loadUser,mybookings} from '../actions/authActions'
import ReactTimeout from "react-timeout";
import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";

import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types'


class Mybookings extends Component{
 
  constructor(props)
  {
    super(props)
    this.state={
      flag:null,
      }
      
  }
  
  myBookings = () =>{
     this.props.mybookings(this.props.user._id)
  }

  
  async componentDidMount(){
    await this.props.loadUser()
    
    this.props.setTimeout(this.myBookings, 100);
  }
 
render(){
  
 const user_orders = this.props.orderList?this.props.orderList:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/location" />;
}
return(
<div>

<div style={{alignContent:'center',marginTop:'20px'}}>
<center>
  <h1>My Bookings</h1>
{
    user_orders?
    user_orders.map((item) => (
      item?
<div>
<Card style={{ width: '60%' ,alignItems: "center",height:'70%',color:'#800080',backgroundColor:'#d8bfd8'}}>
  <Card.Body>
    
    <Card.Text>
     <label style={{float:'left'}}>Services Chosen : </label> {item.services_chosen.map((ser) =>(
      <p style={{float:'left'}}> {ser} ,</p> 
     ))}
     <br/><br/>
     Total cost : {item.total_cost}
     <br/>
     Date : {item.date}
     <br/>
     Professioanl Name : {item.prof_name}
     <br/>
     Professional Phone Number : {item.prof_phone}
     <br/>
     Slot Booked : {item.slot}
     <br/>
     Address : {item.address}
     City : {item.city}
    </Card.Text>
    {/* <Fab aria-label="like" >
        <FavoriteIcon />
      </Fab> */}
  </Card.Body>
</Card>
<br/>
</div>
  :
    null      
    )) 
    :
  null

}
</center>
</div>
</div>
)
}
}

Mybookings.propTypes={
  token:PropTypes.string,
  mybookings:PropTypes.func.isRequired,
  orderList:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
orderList:state.auth.mybookings,
user:state.auth.user
})

export default ReactTimeout(connect(mapStateToProps,{loadUser,mybookings})(Mybookings));
