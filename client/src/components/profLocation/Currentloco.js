import React from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import { sendLocation } from '../../actions/profActions'
import PropTypes from 'prop-types'
import { geolocated } from "react-geolocated";
import { connect } from 'react-redux'
import {
  Redirect
} from "react-router-dom";

class ProfCurrentloco extends React.Component {
  state = {
    address: null,
    position: {
      lat: null,
      lng: null
    },
    flag:null
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendAddress(position, address) {
    var id = this.props.user._id
    console.log(id)
    this.props.sendLocation(id, position.lat, position.lng, address)
    this.setState({
      flag:2
    })
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
      if(this.props.coords && !this.state.flag) 
      { 
        this.setLocation(this.props.coords.latitude,this.props.coords.longitude)
      }

      if(this.state.flag===2)
      {
        return <Redirect to="/" />
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
        <Button style={{ marginTop: '250px', height: '50px' }} onClick={() => { this.sendAddress(this.state.position, this.state.address) }}>Continue to Book</Button>
      </div>
    )
  }
}


ProfCurrentloco.propTypes = {
  user: PropTypes.object.isRequired,
  sendLocation: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { sendLocation })( geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ProfCurrentloco))


