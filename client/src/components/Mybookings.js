import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Container, ListGroup, ListGroupItem, Button, Row, Col, 
  Table, TabContent, TabPane, Modal, ModalHeader,  ModalBody, Form,
  FormGroup, Label, Input} from 'reactstrap'

import {loadUser,mybookings} from '../actions/authActions'
import ReactTimeout from "react-timeout";
import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";

import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import { FaUserAlt } from "react-icons/fa";


class Mybookings extends Component{
 
  constructor(props)
  {
    super(props)
    this.state={
      flag:null,
      modal:false,
      to_review:null,
      modal_toggle:{}
      }
      
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    })
    console.log(this.state.modal)
  }

  myBookings=() =>{
    if(this.props.user){
      this.props.mybookings(this.props.user._id)
    }
  }

  modalToggle = () =>{
    console.log('heyyyyyyyyyyyyyyyyyyyyy')
    console.log(this.props.user._id)
    console.log(this.props.orderList)
  }

  
  async componentDidMount(){
    await this.props.loadUser()
    this.props.setTimeout(this.myBookings, 200);
    this.props.setTimeout(this.modalToggle, 1000);
    // await console.log(this.props)
    // console.log(this.props.orderList)
    
  }
 
render(){
  
 const user_orders = this.props.orderList?this.props.orderList:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/location" />;
}
console.log('hlooooooooooooo')
return(
<div>

<div style={{alignContent:'center',marginTop:'20px'}}>
<center>
<br/>
  <h1>My Bookings</h1>
  <br/><br/>

  <Container>
    <Row style={{borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
      <Col md="1"><b>Date</b></Col>
      <Col md="2"><b>Services Chosen</b></Col>
      <Col md="3"><b>Address</b></Col>
      <Col md="3"><b>Professional Details</b></Col>
      <Col md="1"><b>Slot Booked</b></Col>
      <Col md="1"><b>Total Cost</b></Col>
      <Col md="1"><b>Review</b></Col>

    </Row>
{
    user_orders?
    user_orders.map((item) => (
      item?
    
<Row className="mybooks_row" style={{borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
    <Col md="1">{item.date}</Col>
    <Col md="2">
      <ul>
      {item.services_chosen.map((ser) =>(
        <li> {ser} </li> 
      ))}
      </ul>
    </Col>

     <Col md="3">
      {item.address}
      <br/>
      <b>City : </b> {item.city}
     </Col>

     <Col md="3">
      <b>Name : </b> {item.prof_name}
      <br/>
      <b>Phone Number : </b>{item.prof_phone}
     </Col>

     <Col md="1">{item.slot}</Col>

     <Col md="1">Rs. {item.total_cost}</Col>

    <Col md="1">
      <Button onClick={this.toggle} href="#" >
        Review
      </Button>
    </Col>
     
     <br/>


<br/>

</Row>
  :
    null      
    )) 
    :
  null

}
</Container>

</center>
<br/><br/><br/><br/>
<center>

</center>

</div>







<Modal isOpen={this.state.modal} toggle={this.toggle} >
      <ModalHeader toggle={this.toggle}>Login</ModalHeader>
      <ModalBody>
      <Form>
        <FormGroup>
          <Label for="exampleText">Review</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Give your valuable review..."/>
          <br/>
          <Button color="dark" block>
          Submit
          </Button>
        </FormGroup>
      </Form>
      </ModalBody>
      </Modal>

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
