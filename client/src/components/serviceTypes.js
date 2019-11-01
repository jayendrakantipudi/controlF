import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {Card, CardTitle, CardText} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {get_services} from '../actions/serviceTypeactions'
import {FaRupeeSign} from 'react-icons/fa'
import '../index.css'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class serviceTypes extends Component{
  state = {
    data_ser: null,
    count:0,
  }
  componentDidMount(){
    this.props.loadUser();
    const {name} = this.props.match.params;
    this.props.get_services(name);
  }

  changeQuantityplus = (data_services, temp) => {
    for (var i = data_services.length - 1; i >= 0; i--) {
      if (data_services[i].service_type===temp) {
        data_services[i].quantity = data_services[i].quantity + 1;
      }
    }
    this.setState({ data_ser: data_services });
    this.setState({count: this.state.count+1})
  }

    changeQuantityminus = (data_services, temp) => {
    for (var i = data_services.length - 1; i >= 0; i--) {
      if (data_services[i].service_type===temp) {
        if(data_services[i].quantity>0){
        data_services[i].quantity = data_services[i].quantity - 1;
        }
      }
    }
    this.setState({ data_ser: data_services });
    this.setState({count: this.state.count+1})
  }

  calculateTotal = (data_services) =>{
    var temp_total = 0
    for (var i = data_services.length - 1; i >= 0; i--) {
      temp_total = temp_total + (data_services[i].cost * data_services[i].quantity)
    }
    return temp_total
  }

render(){
  const {name} = this.props.match.params;
  var total = 0;
  var selected_services = null;
  if(this.state.count===0){
    const services=this.props.service;
    var data_services = [];
    
    for (var i in services.ser){
      data_services.push(services.ser[i]);
    }    

    for (var i = data_services.length - 1; i >= 0; i--) {
      data_services[i]['quantity'] = 0
    }
  }
  if(this.state.data_ser){
    total = this.calculateTotal(this.state.data_ser);
  }
  if(total!=0){
    selected_services = []
    if(this.state.data_ser){
      for (var i = this.state.data_ser.length - 1; i >= 0; i--) {
        if(this.state.data_ser[i].quantity > 0){
          selected_services.push(this.state.data_ser[i])
        }
      }
    }
    if(selected_services.length===0){
      selected_services = null
    }
    if(selected_services.length>1){
      for (var i = selected_services.length - 1; i >= selected_services.length/2; i--) {
        const temp1 = selected_services[i];
        selected_services[i] = selected_services[selected_services.length-1-i];
        selected_services[selected_services.length-1-i] = temp1;
      }
    }
  }



if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
return(
  <div>
  <br/>
  <br/>
  <Container className="container_stype">
      <Row>
    <Col sm="8"><h1>Services for {name}</h1></Col>
    </Row>
  <Row>
  <Col sm="8">
    
    <Table borderless hover style={{textAlign:'center'}}>
        <thead className="block-example">
          <tr>
            <th>Service Type</th>
            <th>Price (INR)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>

      {

        this.state.data_ser?
        this.state.data_ser.map((item) => (
      <tr>
        <td>{item.service_type}</td>
        <td><FaRupeeSign />{item.cost}</td>
        <td>
            <button variant="light"
            onClick={() => { this.changeQuantityminus(this.state.data_ser, item.service_type); }}
            >-</button>
            
               {' '}{item.quantity}{' '}
            <button variant="light"
              onClick={() => { this.changeQuantityplus(this.state.data_ser, item.service_type); }}
            >+</button>
        </td>
      </tr>
      ))
      :
      data_services.map((item) => (
      <tr>
        <td>{item.service_type}</td>
        <td><FaRupeeSign />{item.cost}</td>
        <td>
            <button variant="light" 
            onClick={() => { this.changeQuantityminus(data_services, item.service_type); }}>-</button>
            
               {' '}{item.quantity}{' '}
            <button variant="light"
              onClick={() => { this.changeQuantityplus(data_services, item.service_type); }}
            >+</button>
        </td>
      </tr>
      ))

    }
      </tbody>
    </Table>
    </Col>
    
    
      <Col sm="4" className="check_stype">
      <div className="summary_stype">
      <br/>
      <h3>Order</h3>
      <hr className="summary_stype_underline" />
        {(selected_services)?
        <Table borderless>
        <thead>
        <tr><th>Service</th><th>Quantity</th><th>Cost</th></tr>
        </thead>
        <tbody>
          {selected_services.map((item) => (
            <tr>
              <td>{item.service_type}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
        </Table>
       :'No Service Selected'}
       <br/>
        <b>Total Cost : {total}</b><br/><br/>
        {(total===0)?' ': <Button className='to_add_break'>Continue to Checkout</Button> }
        <br/>
      </div>
      </Col>
    </Row>
    </Container>





      






      
  </div>
)
}
}

serviceTypes.propTypes={
  loadUser:PropTypes.func.isRequired,
  token:PropTypes.string.isRequired,
  get_services:PropTypes.func.isRequired,
  service:PropTypes.object.isRequired,
}



const mapStateToProps=state=>({
token:state.auth.token,
service:state.service,
})
export default connect(mapStateToProps,{loadUser, get_services})(serviceTypes)
