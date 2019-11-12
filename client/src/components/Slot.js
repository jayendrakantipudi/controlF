import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {getSlots,bookSlot} from '../actions/slotActions'

import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Slot extends Component{

   state= {
     flag:null
   }

  componentDidMount(){
     this.props.getSlots()
  }

  bookslot = async(e) =>{
    const slottter = await this.props.bookSlot(e.target.value,this.props.order);
    this.setState({flag:true})
  }

render(){
 const slots_available = this.props.Slots.all_slots?this.props.Slots.all_slots:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/location" />;
}
return(

<div >
<Table>
  <tr>
    <td>Start Time</td>
    <td>To</td>
    <td>End Time</td>
    <td>Select</td>
    </tr>
<tbody>
{

    slots_available?
    slots_available.map((item) => (
      item?
  <tr>
    <td>{item.start_time}</td>
    <td>to</td>
    <td>{item.end_time}</td>
    <Button variant="light" value={item._id} onClick={this.bookslot} >
        </Button>
     </tr>
     :
     null
          
    ))
  :
  null

}
</tbody>
</Table>
</div>
)
}
}

Slot.propTypes={
  token:PropTypes.string,
  getSlots:PropTypes.func.isRequired,
  Slots:PropTypes.object.isRequired,
  bookSlot:PropTypes.func.isRequired,
  order:PropTypes.string
}

const mapStateToProps=state=>({
Slots:state.slots,
token:state.auth.token,
order:state.order.order_id
})
export default connect(mapStateToProps,{getSlots, bookSlot})(Slot)
