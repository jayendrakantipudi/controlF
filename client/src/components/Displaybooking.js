import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class DisplayBooking extends Component{
  state = {
    flag:null
  }

  closebutton(){
    this.setState({flag:1})
  }

render(){
  
const name=this.props.order?this.props.order.name:null;
const services_chosen = this.props.order?this.props.order.services_chosen:null;
const total_cost=this.props.order?this.props.order.total_cost:null;
const professional = this.props.order?this.props.order.prof_name:null;
const professional_number = this.props.order?this.props.order.prof_phone:null;
const slot = this.props.order?this.props.order.slot:null;
const address = this.props.order?this.props.order.address:null;
const city = this.props.order?this.props.order.city:null;

if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
if(this.state.flag===1){
      return <Redirect to="/" />;
    }
return(
<div>
<div style={{fontSize:'200%'}}>
  YOUR Booking<br/><br/>
</div>
<ListGroup>
  <ListGroupItem>
    Name:{name?name:null}
  </ListGroupItem>
  <ListGroupItem>
    Services Chosen:{services_chosen?services_chosen:null}
  </ListGroupItem>
  <ListGroupItem>
    Total Cost:{total_cost?total_cost:null}
  </ListGroupItem>
  <ListGroupItem>
    Professional Name:{professional?professional:null}
  </ListGroupItem>
  <ListGroupItem>
    Professional Phone Number:{professional_number?professional_number:null}
  </ListGroupItem>
  <ListGroupItem>
    Slot:{slot?slot:null}
  </ListGroupItem>
  <ListGroupItem>
    Address:{address?address:null}
  </ListGroupItem>
  <ListGroupItem>
    City:{city?city:null}
  </ListGroupItem>
</ListGroup>
<Button style={{align:"left"}} onClick={()=>this.closebutton()}>Ok</Button>
</div>
)
}
}

DisplayBooking.propTypes={
  order:PropTypes.object.isRequired,
  token:PropTypes.string
}

const mapStateToProps=state=>({
order:state.booking.order,
token:state.auth.token
})
export default connect(mapStateToProps,{})(DisplayBooking)
