import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {loadUser,mybookings} from '../actions/authActions'
import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Mybookings extends Component{

   state= {
     flag:null
   }

  componentDidMount(){
    this.props.loadUser();
   
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


{
    user_orders?
    user_orders.map((item) => (
      item?
<Card style={{ width: '18rem' }}>
  <Card.Body>
    
    <Card.Text>
     Services Chosen : {item.services_chosen}
     Total cost : {item.total_cost}
     Professional Name : {item.prof_name}
     Date : {item.date}
     Professioanl Name : {item.prof_name}
     Professional Phone Number : {item.prof_phone}
     Slot Booked : {item.slot}
     Address : {item.address}
     City : {item.city}
    </Card.Text>
    
  </Card.Body>
</Card>
    :
    null      
    )) 
    :
  null

}
</div>
)
}
}

Mybookings.propTypes={
  token:PropTypes.string,
  loaduser:PropTypes.func.isRequired,
  mybookings:PropTypes.func.isRequired,
  orderList:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
user:state.auth.user,
orderList:state.auth.mybookings,
})
export default connect(mapStateToProps,{loadUser,mybookings})(Mybookings)
