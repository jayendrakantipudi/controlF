
import React from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import { bookSlot,getCities } from '../actions/locationAction'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import PropTypes from 'prop-types'
import { geolocated } from "react-geolocated";
import { connect } from 'react-redux'
 
import {
  Redirect
} from "react-router-dom";

class Currentloco extends React.Component {
  state = {
    city:null,
    address: null,
    position: {
      lat: null,
      lng: null
    },
    flag:null
  }


  componentDidMount(){
    this.props.getCities()
 }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendAddress(position, address,city) {
    var id = this.props.order.order_id
    console.log(id)
    this.props.bookSlot(id, position.lat, position.lng, address,city)
    this.setState({flag:2})
  }
  
  handleChange = (value) => {
    this.setState({
        city: value
    });
  }

  setLocation = (lat1, lng1) => {
    this.setState({
      position: {
        lat: lat1,
        lng: lng1
      },
      flag:1
    })
    
  }

  render() {
    if(!this.props.isGeolocationAvailable)
      return(<div>Your browser does not support Geolocation</div>)
      if(this.props.coords && this.state.flag===null) 
      { 
        this.setLocation(this.props.coords.latitude,this.props.coords.longitude)
      }
      if(this.state.flag==2)
      {
        return <Redirect to="/displaybooking" />;
      }
    return (
      <div>
        <Form style={{ height: '100px', position: 'fixed' }}>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="address"
              onChange={this.onChange}
            />
          </FormGroup>
        </Form>
        <DropdownButton id="dropdown-basic-button" title={this.state.city}>
           { 
            this.props.all_cities?
            this.props.all_cities.map((item) => (
            <Dropdown.Item value={item.city} onSelect={()=>{this.handleChange(item.city)}} >{item.city}</Dropdown.Item>
            )
            )
            : null
          }
          </DropdownButton>
          
        <Button style={{ marginTop: '250px', height: '50px' }} onClick={() => { this.sendAddress(this.state.position, this.state.address,this.state.city) }}>Continue to Book</Button>
      </div>
    )
  }
}


Currentloco.propTypes = {
  order: PropTypes.object.isRequired,
  bookSlot: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  all_cities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  order: state.order,
  all_cities: state.booking.all_cities
})

export default connect(mapStateToProps, { bookSlot,getCities })( geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Currentloco))


