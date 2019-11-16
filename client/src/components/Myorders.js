import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {loadUser} from '../actions/authActions'
import {myorders} from '../actions/profActions'
import ReactTimeout from "react-timeout";
import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";

import PropTypes from 'prop-types'


class Myorders extends Component{
 
  constructor(props)
  {
    super(props)
    this.state={
      flag:null,
      }
      
  }
  
  myBookings = () =>{
     this.props.myorders(this.props.user._id)
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
  <h1>My Orders</h1>
{
    user_orders?
    user_orders.map((item) => 
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
     Customer Name : {item.user_name}
     <br/>
     {/* <p>Customer Phone Number : {item.prof_phone}</p>:<p>Customer Email : {item.user_email}</p>}  */}
     Customer Email : {item.user_email}
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
    ) 
    :
  null

}
</center>
</div>
</div>
)
}
}

Myorders.propTypes={
  token:PropTypes.string,
  myorders:PropTypes.func.isRequired,
  orderList:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
orderList:state.prof.my_orders,
user:state.auth.user
})

export default ReactTimeout(connect(mapStateToProps,{loadUser,myorders})(Myorders));
